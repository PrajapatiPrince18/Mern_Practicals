import React from 'react';

function InventoryTable({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</p>
        <h4>No inventory items found.</h4>
        <p style={{ fontSize: '0.85rem' }}>Register a new product using the form or clear search filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SKU & Name</th>
            <th>Category</th>
            <th>Stock Status</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total Value</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            let statusClass = 'status-in';
            if (item.quantity === 0) statusClass = 'status-out';
            else if (item.quantity <= item.reorderLevel) statusClass = 'status-low';

            return (
              <tr key={item._id || item.sku}>
                <td>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {item.sku} &bull; {item.supplier}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', background: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <span className={`badge-status ${statusClass}`}>{item.stockStatus}</span>
                </td>
                <td style={{ fontWeight: 700 }}>{item.quantity}</td>
                <td>₹{Number(item.unitPrice).toLocaleString('en-IN')}</td>
                <td style={{ color: '#34d399', fontWeight: 600 }}>
                  ₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}
                </td>
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ marginRight: '0.4rem' }}
                    onClick={() => onEdit(item)}
                  >
                    ✏️
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(item._id, item.name)}>
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
