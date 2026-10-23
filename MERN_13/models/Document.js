const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Engineering', 'Legal', 'HR', 'Finance'], default: 'Engineering' },
  version: { type: String, default: '1.0' },
  originalName: { type: String, required: true },
  storedName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  formattedSize: { type: String },
  storagePath: { type: String, required: true },
  uploadedBy: { type: String, default: 'Prince Prajapati' }
}, { timestamps: true });

documentSchema.pre('save', function (next) {
  if (this.fileSize < 1024) this.formattedSize = this.fileSize + ' B';
  else if (this.fileSize < 1024 * 1024) this.formattedSize = (this.fileSize / 1024).toFixed(1) + ' KB';
  else this.formattedSize = (this.fileSize / (1024 * 1024)).toFixed(2) + ' MB';
  next();
});

module.exports = mongoose.model('Document', documentSchema);
