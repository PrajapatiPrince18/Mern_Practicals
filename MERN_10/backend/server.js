require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend build if present or public fallback
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const publicDir = path.join(__dirname, 'public');
app.use(express.static(frontendDist));
app.use(express.static(publicDir));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[MERN_10 API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// API Routes
app.use('/api/inventory', inventoryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 10: Complete MERN Full-Stack Inventory Management API',
    database: 'MongoDB Atlas Connected',
    endpoints: {
      getAllItems: 'GET /api/inventory',
      getItemById: 'GET /api/inventory/:id',
      createItem: 'POST /api/inventory',
      updateItem: 'PUT /api/inventory/:id',
      deleteItem: 'DELETE /api/inventory/:id',
      stats: 'GET /api/inventory/stats/overview'
    }
  });
});

// Fallback to React app or JSON 404
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDist, 'index.html');
  const publicIndexPath = path.join(publicDir, 'index.html');
  const fs = require('fs');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else if (fs.existsSync(publicIndexPath)) {
    res.sendFile(publicIndexPath);
  } else {
    res.status(404).json({ success: false, message: 'Route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Practical 10: Complete Full-Stack MERN System`);
  console.log(`⚛️ Server running at: http://localhost:${PORT}`);
  console.log(`⚛️ Inventory API: http://localhost:${PORT}/api/inventory`);
  console.log(`=================================================`);
});

module.exports = app;
