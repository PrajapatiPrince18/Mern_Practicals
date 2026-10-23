const mongoose = require('mongoose');

const fileRecordSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: [true, 'Original file name is required.'],
      trim: true
    },
    storedName: {
      type: String,
      required: [true, 'Stored file name is required.'],
      unique: true
    },
    mimeType: {
      type: String,
      required: true
    },
    sizeBytes: {
      type: Number,
      required: true
    },
    formattedSize: {
      type: String
    },
    storagePath: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Image', 'Document', 'Code/Data', 'Other'],
      default: 'Document'
    },
    uploaderName: {
      type: String,
      default: 'Prince Prajapati'
    },
    description: {
      type: String,
      trim: true,
      default: 'Uploaded via Multer file module'
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to format human-readable size and auto-categorize
fileRecordSchema.pre('save', function (next) {
  if (this.sizeBytes < 1024) {
    this.formattedSize = `${this.sizeBytes} B`;
  } else if (this.sizeBytes < 1024 * 1024) {
    this.formattedSize = `${(this.sizeBytes / 1024).toFixed(1)} KB`;
  } else {
    this.formattedSize = `${(this.sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (this.mimeType.startsWith('image/')) {
    this.category = 'Image';
  } else if (this.mimeType.includes('pdf') || this.mimeType.includes('word') || this.mimeType.includes('text')) {
    this.category = 'Document';
  } else if (this.mimeType.includes('json') || this.mimeType.includes('javascript')) {
    this.category = 'Code/Data';
  } else {
    this.category = 'Other';
  }

  next();
});

const FileRecord = mongoose.model('FileRecord', fileRecordSchema);
module.exports = FileRecord;
