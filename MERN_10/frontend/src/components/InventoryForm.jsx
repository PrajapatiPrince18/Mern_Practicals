import React, { useState, useEffect } from 'react';

const initialForm = {
  sku: '',
  name: '',
  category: 'Electronics',
  quantity: '',
  unitPrice: '',
  supplier: 'Prince Tech Logistics',
  reorderLevel: 5
};

function InventoryForm({ onSave, editingItem, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData(initialForm);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sku || !formData.name || formData.quantity === '' || formData.unitPrice === '') {
      alert('Please fill out all mandatory fields (SKU, Name, Quantity, Price).');
      return;
    }

    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      reorderLevel: Number(formData.reorderLevel || 5)
    });

    if (!editingItem) {
      setFormData(initialForm);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{editingItem ? '✏️ Edit Product' : '➕ Register Product'}</h3>
        {editingItem && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">SKU Code *</label>
          <input
            type="text"
            name="sku"
            className="form-input"
            placeholder="e.g. ELC-901"
            value={formData.sku}
            onChange={handleChange}
            disabled={!!editingItem}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="e.g. Wireless Noise Canceling Headphones"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
            <option value="Electronics">Electronics</option>
            <option value="Computing">Computing</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Quantity *</label>
            <input
              type="number"
              name="quantity"
              min="0"
              className="form-input"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Unit Price (₹) *</label>
            <input
              type="number"
              name="unitPrice"
              min="0"
              className="form-input"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Supplier</label>
            <input
              type="text"
              name="supplier"
              className="form-input"
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Reorder Alert Qty</label>
            <input
              type="number"
              name="reorderLevel"
              className="form-input"
              value={formData.reorderLevel}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          {editingItem ? 'Save Updates' : 'Add to MongoDB Atlas'}
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;
