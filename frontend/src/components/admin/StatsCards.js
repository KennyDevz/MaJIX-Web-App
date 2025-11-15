import React from 'react';
import '../../styles/admin/AdminLayout.css'; // We'll create this new CSS file

// Helper component for an individual card
const StatCard = ({ label, value, className = '' }) => (
  <div className={`stat-card ${className}`}>
    <h3>{label}</h3>
    <p>{value}</p>
  </div>
);

export default function StatsCards({ stats }) {
  const { 
    productCount = 0, 
    totalOrders = 5, 
    pendingOrders = 2, 
    returnRequest = 1, 
    totalRevenue = '$ 5,257' 
  } = stats;

  return (
    <div className="stats-grid">
      <StatCard label="Total Products" value={productCount} />
      <StatCard label="Total Orders" value={totalOrders} />
      <StatCard label="Pending Orders" value={pendingOrders} />
      <StatCard label="Return Request" value={returnRequest} />
      <StatCard label="Total Revenue" value={totalRevenue} />
    </div>
  );
}