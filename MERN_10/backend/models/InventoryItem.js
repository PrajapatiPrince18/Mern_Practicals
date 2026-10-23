const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, 'SKU code is required.'],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, 'Product / Item Name is required.'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: ['Electronics', 'Computing', 'Office Supplies', 'Accessories', 'Furniture']
    },
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required.'],
      min: [0, 'Quantity cannot be negative.']
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required.'],
      min: [0, 'Unit price cannot be negative.']
    },
    supplier: {
      type: String,
      default: 'Prince Tech Logistics'
    },
    reorderLevel: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

inventoryItemSchema.virtual('stockStatus').get(function () {
  if (this.quantity === 0) return 'Out of Stock';
  if (this.quantity <= this.reorderLevel) return 'Low Stock';
  return 'In Stock';
});

inventoryItemSchema.virtual('totalValue').get(function () {
  return (this.quantity * this.unitPrice).toFixed(2);
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem;
