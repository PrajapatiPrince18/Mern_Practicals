const fs = require('fs');
const path = require('path');
const FileRecord = require('../models/FileRecord');

/**
 * @desc Upload Single File & Persist Metadata in MongoDB
 * @route POST /api/files/upload-single
 */
const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file received. Please provide a file under the field "file".'
      });
    }

    const { uploaderName, description } = req.body;

    const fileDoc = await FileRecord.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      storagePath: req.file.path,
      uploaderName: uploaderName || 'Prince Prajapati',
      description: description || 'Practical 09 upload'
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded and metadata stored in MongoDB Atlas successfully.',
      file: fileDoc
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Upload Multiple Files (up to 5) & Persist in MongoDB
 * @route POST /api/files/upload-multiple
 */
const uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded. Provide files under the field "files".'
      });
    }

    const { uploaderName, description } = req.body;

    const docs = req.files.map((f) => ({
      originalName: f.originalname,
      storedName: f.filename,
      mimeType: f.mimetype,
      sizeBytes: f.size,
      storagePath: f.path,
      uploaderName: uploaderName || 'Prince Prajapati',
      description: description || 'Multi-file batch upload'
    }));

    const savedRecords = await FileRecord.insertMany(docs);

    res.status(201).json({
      success: true,
      message: `Successfully uploaded and saved ${savedRecords.length} files into MongoDB.`,
      count: savedRecords.length,
      files: savedRecords
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc List all stored file metadata records from MongoDB
 * @route GET /api/files
 */
const getAllFiles = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.originalName = { $regex: search, $options: 'i' };
    }

    const files = await FileRecord.find(query).sort({ createdAt: -1 });
    const totalStorageBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);

    res.status(200).json({
      success: true,
      totalCount: files.length,
      totalStorageUsed: (totalStorageBytes / (1024 * 1024)).toFixed(2) + ' MB',
      data: files
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Download File Binary from Disk
 * @route GET /api/files/download/:id
 */
const downloadFile = async (req, res, next) => {
  try {
    const file = await FileRecord.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File record not found.' });
    }

    if (!fs.existsSync(file.storagePath)) {
      return res.status(410).json({ success: false, message: 'File exists in database but physical file is missing from disk.' });
    }

    res.download(file.storagePath, file.originalName);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete file from Disk and delete metadata from MongoDB
 * @route DELETE /api/files/:id
 */
const deleteFile = async (req, res, next) => {
  try {
    const file = await FileRecord.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File record not found.' });
    }

    if (fs.existsSync(file.storagePath)) {
      fs.unlinkSync(file.storagePath);
    }

    await FileRecord.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `File "${file.originalName}" permanently deleted from disk and MongoDB.`,
      deletedId: req.params.id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  getAllFiles,
  downloadFile,
  deleteFile
};
