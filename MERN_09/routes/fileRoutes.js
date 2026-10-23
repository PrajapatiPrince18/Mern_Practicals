const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const {
  uploadSingleFile,
  uploadMultipleFiles,
  getAllFiles,
  downloadFile,
  deleteFile
} = require('../controllers/fileController');

// Upload single file (field name: 'file')
router.post('/upload-single', upload.single('file'), uploadSingleFile);

// Upload multiple files (up to 5, field name: 'files')
router.post('/upload-multiple', upload.array('files', 5), uploadMultipleFiles);

// Get list of uploaded file records from MongoDB
router.get('/', getAllFiles);

// Download file binary
router.get('/download/:id', downloadFile);

// Delete file record and binary
router.delete('/:id', deleteFile);

module.exports = router;
