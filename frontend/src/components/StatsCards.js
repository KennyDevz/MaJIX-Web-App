import React from 'react';

const StatsCards = ({ stats }) => {
  const { totalProducts, totalOrders, pendingOrders, returnRequest, totalRevenue } = stats;

  // Helper component for an individual card
  const StatCard = ({ label, value, colorClass = '' }) => (
    <div className={`stat-card ${colorClass}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );

  return (
    <div className="stats-container">
      <StatCard label="Total Products" value={totalProducts} />
      <StatCard label="Total Orders" value={totalOrders} />
      <StatCard label="Pending Orders" value={pendingOrders} />
      <StatCard label="Return Request" value={returnRequest} />
      {/* Total Revenue has a different visual style (dark background) */}
      <StatCard label="Total Revenue" value={totalRevenue} colorClass="revenue-card" />
    </div>
  );
};

export default StatsCards;