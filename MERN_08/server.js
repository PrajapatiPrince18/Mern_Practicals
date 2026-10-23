require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const inspectorRoutes = require('./routes/inspectorRoutes');

const app = express();
const PORT = process.env.PORT || 5008;

// 1. Built-in & Third-party Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 2. Application-level Custom Middleware
app.use(loggerMiddleware);

// 3. Welcome / Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 08: Express.js Routing, Middleware & Request Handling API',
    middlewareStack: [
      'cors',
      'express.json()',
      'express.urlencoded()',
      'express.static()',
      'custom loggerMiddleware',
      'router-level middleware',
      'authMiddleware (x-api-key)',
      'validateMiddleware',
      'central errorHandler'
    ],
    timestamp: new Date().toISOString()
  });
});

// 4. Mount Modular Routers
app.use('/api/users', userRoutes);
app.use('/api', inspectorRoutes);

// 5. Fallback 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}. Route not registered.`
  });
});

// 6. Central Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Practical 08: Routing, Middleware & Request Handling`);
  console.log(`⚛️ Server running at: http://localhost:${PORT}`);
  console.log(`⚛️ API Endpoints: http://localhost:${PORT}/api/users`);
  console.log(`⚛️ Request Inspector: http://localhost:${PORT}/api/inspect`);
  console.log(`=================================================`);
});

module.exports = app;
