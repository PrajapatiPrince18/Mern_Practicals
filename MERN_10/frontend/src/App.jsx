import React, { useState, useEffect } from 'react';
import StatsCard from './components/StatsCard';
import InventoryForm from './components/InventoryForm';
import InventoryTable from './components/InventoryTable';

const API_BASE = '/api/inventory';

function App() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3500);
  };

  const fetchInventory = async () => {
    try {
      let url = `${API_BASE}?category=${categoryFilter}&stockStatus=${statusFilter}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats/overview`);
      const json = await res.json();
      if (json.success) setStats(json.stats);
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchStats();
  }, [categoryFilter, statusFilter, search]);

  const handleSave = async (itemData) => {
    try {
      let res;
      if (editingItem) {
        res = await fetch(`${API_BASE}/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
        });
      } else {
        res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
        });
      }
      const json = await res.json();
      if (res.ok) {
        showAlert(json.message);
        setEditingItem(null);
        fetchInventory();
        fetchStats();
      } else {
        showAlert(json.message || 'Operation failed', 'danger');
      }
    } catch (err) {
      showAlert(`Network error: ${err.message}`, 'danger');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from inventory?`)) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok) {
        showAlert(json.message);
        fetchInventory();
        fetchStats();
      } else {
        showAlert(json.message, 'danger');
      }
    } catch (err) {
      showAlert(`Delete failed: ${err.message}`, 'danger');
    }
  };

  return (
    <div>
      <header className="header">
        <span className="header-badge">PRACTICAL NO. 10</span>
        <h1 className="header-title">Full-Stack MERN Inventory Application</h1>
        <p className="header-subtitle">
          React Client (Vite) &bull; Express.js Backend &bull; MongoDB Atlas Cloud Database &bull; Node.js Architecture
        </p>
      </header>

      <main className="container">
        {alert && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: alert.type === 'danger' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              border: `1px solid ${alert.type === 'danger' ? '#ef4444' : '#10b981'}`,
              color: alert.type === 'danger' ? '#fca5a5' : '#6ee7b7'
            }}
          >
            {alert.message}
          </div>
        )}

        <StatsCard stats={stats} />

        <div className="main-layout">
          <InventoryForm
            onSave={handleSave}
            editingItem={editingItem}
            onCancel={() => setEditingItem(null)}
          />

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📦 Real-time MongoDB Inventory Records</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Showing {items.length} records
              </span>
            </div>

            <div className="search-bar-row">
              <input
                type="text"
                placeholder="🔍 Search SKU, item name, supplier..."
                className="form-input"
                style={{ flex: 1, minWidth: '220px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select"
                style={{ width: 'auto', minWidth: '150px' }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Computing">Computing</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
              <select
                className="form-select"
                style={{ width: 'auto', minWidth: '140px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <InventoryTable
              items={items}
              onEdit={(item) => setEditingItem(item)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
