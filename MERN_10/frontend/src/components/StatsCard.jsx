import React from 'react';

function StatsCard({ stats }) {
  const cards = [
    {
      title: 'Total Products',
      val: stats.totalItems || 0,
      icon: '📦',
      bg: 'rgba(79, 70, 229, 0.15)',
      color: '#818cf8'
    },
    {
      title: 'Total Valuation',
      val: `₹${(stats.totalValuation || 0).toLocaleString('en-IN')}`,
      icon: '💰',
      bg: 'rgba(16, 185, 129, 0.15)',
      color: '#34d399'
    },
    {
      title: 'Low Stock Items',
      val: stats.lowStockCount || 0,
      icon: '⚠️',
      bg: 'rgba(245, 158, 11, 0.15)',
      color: '#fbbf24'
    },
    {
      title: 'Out of Stock',
      val: stats.outOfStockCount || 0,
      icon: '🚫',
      bg: 'rgba(239, 68, 68, 0.15)',
      color: '#f87171'
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((c, i) => (
        <div key={i} className="stat-card">
          <div className="stat-icon" style={{ background: c.bg, color: c.color }}>
            {c.icon}
          </div>
          <div>
            <div className="stat-val">{c.val}</div>
            <div className="stat-lbl">{c.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
