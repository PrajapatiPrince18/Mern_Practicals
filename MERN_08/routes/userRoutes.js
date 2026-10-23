const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { authenticateApiKey, authorizeRoles } = require('../middleware/authMiddleware');
const { validateIdParam, validateUserBody } = require('../middleware/validateMiddleware');

// Router-level middleware tracking user routes
router.use((req, res, next) => {
  req.routerLevelTimestamp = Date.now();
  next();
});

// GET /api/users (query filtering)
router.get('/', getAllUsers);

// GET /api/users/:id (param handling)
router.get('/:id', validateIdParam, getUserById);

// POST /api/users (protected + validated body)
router.post('/', authenticateApiKey, validateUserBody, createUser);

// PUT /api/users/:id (protected + validated id)
router.put('/:id', authenticateApiKey, validateIdParam, updateUser);

// DELETE /api/users/:id (protected + role restricted to 'admin')
router.delete('/:id', authenticateApiKey, authorizeRoles('admin'), validateIdParam, deleteUser);

module.exports = router;
