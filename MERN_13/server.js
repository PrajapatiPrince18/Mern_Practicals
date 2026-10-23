require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Document = require('./models/Document');

const app = express();
const PORT = process.env.PORT || 5013;
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected to DMS'))
  .catch(err => console.error('DB Error:', err.message));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

// Upload Document
app.post('/api/docs/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { title, category, version, uploadedBy } = req.body;

    const doc = await Document.create({
      title: title || req.file.originalname,
      category: category || 'Engineering',
      version: version || '1.0',
      originalName: req.file.originalname,
      storedName: req.file.filename,
      fileSize: req.file.size,
      storagePath: req.file.path,
      uploadedBy: uploadedBy || 'Prince Prajapati'
    });

    res.status(201).json({ success: true, message: 'Document archived successfully', data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// List Documents with Search & Category Filter
app.get('/api/docs', async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const docs = await Document.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Download Document
app.get('/api/docs/download/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc || !fs.existsSync(doc.storagePath)) return res.status(404).json({ success: false, message: 'File not found' });
    res.download(doc.storagePath, doc.originalName);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Document
app.delete('/api/docs/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    if (fs.existsSync(doc.storagePath)) fs.unlinkSync(doc.storagePath);
    await Document.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Analytics Overview
app.get('/api/docs/analytics', async (req, res) => {
  try {
    const docs = await Document.find();
    const totalDocs = docs.length;
    const totalBytes = docs.reduce((acc, d) => acc + d.fileSize, 0);
    const formattedStorage = (totalBytes / (1024 * 1024)).toFixed(2) + ' MB';
    res.json({ success: true, totalDocs, formattedStorage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => console.log(`⚛️ Practical 13 (Document Management System) running on port ${PORT}`));
