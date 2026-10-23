const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getInventoryStats
} = require('../controllers/inventoryController');

// Stats route (must precede :id)
router.get('/stats/overview', getInventoryStats);

router.route('/')
  .get(getAllItems)
  .post(createItem);

router.route('/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
