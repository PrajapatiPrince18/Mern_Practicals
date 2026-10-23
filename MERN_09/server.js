require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 5009;

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Static route to serve uploaded assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[Multer API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Welcome / Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 09: Multer File Upload & MongoDB Metadata API',
    endpoints: {
      uploadSingle: 'POST /api/files/upload-single (field: file)',
      uploadMultiple: 'POST /api/files/upload-multiple (field: files)',
      listFiles: 'GET /api/files',
      download: 'GET /api/files/download/:id',
      delete: 'DELETE /api/files/:id'
    }
  });
});

// Mount Routes
app.use('/api/files', fileRoutes);

// Multer & General Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File upload error: File size exceeds the allowed limit of 5 MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Multer Error: ${err.message}`
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Practical 09: Multer File Upload & MongoDB API`);
  console.log(`⚛️ Server running at: http://localhost:${PORT}`);
  console.log(`⚛️ File Manager UI: http://localhost:${PORT}`);
  console.log(`=================================================`);
});

module.exports = app;
