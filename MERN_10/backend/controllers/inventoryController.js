const InventoryItem = require('../models/InventoryItem');

/**
 * @desc Get all inventory items with optional search & category filter
 * @route GET /api/inventory
 */
const getAllItems = async (req, res) => {
  try {
    const { category, search, stockStatus, sortBy } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { supplier: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'price_asc') sort = { unitPrice: 1 };
    if (sortBy === 'price_desc') sort = { unitPrice: -1 };
    if (sortBy === 'qty_asc') sort = { quantity: 1 };
    if (sortBy === 'qty_desc') sort = { quantity: -1 };

    let items = await InventoryItem.find(query).sort(sort);

    if (stockStatus && stockStatus !== 'All') {
      items = items.filter((item) => item.stockStatus === stockStatus);
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get single inventory item by ID
 * @route GET /api/inventory/:id
 */
const getItemById = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found.' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create new inventory item
 * @route POST /api/inventory
 */
const createItem = async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json({
      success: true,
      message: `Item "${item.name}" registered in inventory.`,
      data: item
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'An item with this SKU code already exists.' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update inventory item
 * @route PUT /api/inventory/:id
 */
const updateItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
    res.status(200).json({
      success: true,
      message: `Item "${item.name}" updated successfully.`,
      data: item
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete inventory item
 * @route DELETE /api/inventory/:id
 */
const deleteItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
    res.status(200).json({
      success: true,
      message: `Item "${item.name}" (${item.sku}) deleted.`,
      deletedId: req.params.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Aggregate metrics for inventory dashboard
 * @route GET /api/inventory/stats/overview
 */
const getInventoryStats = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    const totalItems = items.length;
    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalValuation = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const lowStockCount = items.filter((item) => item.quantity <= item.reorderLevel && item.quantity > 0).length;
    const outOfStockCount = items.filter((item) => item.quantity === 0).length;

    res.status(200).json({
      success: true,
      stats: {
        totalItems,
        totalUnits,
        totalValuation: Math.round(totalValuation),
        lowStockCount,
        outOfStockCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getInventoryStats
};
