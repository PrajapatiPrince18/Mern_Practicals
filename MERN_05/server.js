const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Built-in & Third-party Middleware
app.use(cors());
app.use(express.json()); // Parses application/json body
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // Custom Request Logger

// Static visual playground for browser testing & verification
app.get('/playground', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Express CRUD Tester</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: white; padding: 2rem; }
    .card { background: #1e293b; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #334155; }
    button { background: #6366f1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; margin-right: 0.5rem; }
    button:hover { background: #4f46e5; }
    pre { background: #090d16; padding: 1rem; border-radius: 6px; overflow: auto; max-height: 300px; color: #38bdf8; }
  </style>
</head>
<body>
  <h1>⚡ Express.js Product CRUD Test Playground</h1>
  <div class="card">
    <button onclick="fetchApi('/api/products')">GET All Products</button>
    <button onclick="fetchApi('/api/products/1')">GET Product 1</button>
    <button onclick="createProd()">POST New Product</button>
    <button onclick="deleteProd()">DELETE Product 4</button>
  </div>
  <div class="card">
    <h3>API Output:</h3>
    <pre id="output">Click a button above to test API endpoints...</pre>
  </div>
  <script>
    async function fetchApi(url) {
      const res = await fetch(url);
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    async function createProd() {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Gaming Chair RGB', category: 'Furniture', price: 12999, stock: 15 })
      });
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    async function deleteProd() {
      const res = await fetch('/api/products/4', { method: 'DELETE' });
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>
  `);
});

// Welcome / Health Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Practical 05: Express.js Routing & CRUD API Server',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProductById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id',
      testPlayground: 'GET /playground'
    },
    timestamp: new Date().toISOString()
  });
});

// Modular Routes Registration
app.use('/api/products', productRoutes);

// Fallback 404 Route Handler for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`
  });
});

// Central Error Handler Middleware
app.use(errorHandler);

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚛️ Express CRUD Server is running on Port: ${PORT}`);
  console.log(`⚛️ Local URL: http://localhost:${PORT}`);
  console.log(`⚛️ Products Endpoint: http://localhost:${PORT}/api/products`);
  console.log(`=================================================`);
});
