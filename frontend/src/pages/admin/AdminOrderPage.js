import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminOrderPage.css';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // --- 1. FETCH ORDERS ---
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/orders/all');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- 2. HANDLE STATUS UPDATE ---
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${orderId}/status`, null, {
        params: { status: newStatus }
      });
      fetchOrders(); // Refresh list to show new status
      alert(`Order #${orderId} marked as ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating status.");
    }
  };

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status?.toLowerCase() === filter.toLowerCase();
  });

  if (loading) return <div className="loading">Loading Orders...</div>;

  return (
    <>
      <div className="content-header">
        <h2>ORDER MANAGEMENT</h2>
        <select className="order-filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="order-list">
        {filteredOrders.length === 0 ? (
           <p>No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div className="order-card" key={order.orderId}>
              
              {/* HEADER */}
              <div className="order-card-header">
                <h3>Order #{order.orderId}</h3>
                <span className="order-total-price">${order.totalAmount?.toLocaleString()}</span>
              </div>

<<<<<<< Updated upstream
            {/* Order Footer (Items List) */}
            <div className="order-card-footer">
              <h4>Order Items</h4>
              {order.items?.map((item, index) => (
                <div className="order-item-row" key={index}>
                  <div className="item-details">
                          <span className="item-name">
                            {item.productName} <small>({item.size} / {item.color})</small>
                          </span>
                          <span className="item-qty">x{item.quantity}</span>
                        </div>

                        <span className="item-price">${item.subtotal?.toFixed(2)}</span>
                      </div>
              ))}
=======
              {/* BODY (Customer Info) */}
              <div className="order-card-body">
                <div className="order-detail-section">
                  <h4>Customer</h4>
                  <p><strong>{order.customerName}</strong></p>
                  <p>{order.customerEmail}</p>
                </div>
                <div className="order-detail-section">
                  <h4>Shipping</h4>
                  <p>{order.shippingAddress}</p>
                </div>

                <div className="order-detail-section">
                  <h4 style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>PAYMENT</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Simple Icon based on method */}
                    <span style={{ fontSize: '1.2rem' }}>
                      {order.paymentMethod === 'COD'}
                    </span>
                  <div>
                  <p style={{ fontWeight: 'bold', margin: 0, color: '#333' }}>
                    {order.paymentMethod || "Not Specified"}
                  </p>
            {/* Optional: Add payment status if you have it, otherwise just show method */}
            <small style={{ color: order.status === 'DELIVERED' ? 'green' : '#666' }}>
                {order.status === 'DELIVERED' ? 'Paid' : 'Payment Pending'}
            </small>
        </div>
    </div>
  </div>
              </div>

              {/* FOOTER (Items + Images) */}
              <div className="order-card-footer">
                <h4>Order Items</h4>
                {order.items?.map((item, index) => (
                  <div className="order-item-row" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    
                    {/* --- RESTORED IMAGE LOGIC --- */}
                    {item.imageUrl && (
                        <img 
                            src={item.imageUrl} 
                            alt={item.productName} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px', border: '1px solid #ddd' }} 
                        />
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 'bold' }}>{item.productName}</span>
                      <br/>
                      <small style={{ color: '#666' }}>
                         Size: {item.size} | Color: {item.color}
                      </small>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                       <span>x{item.quantity}</span>
                       <br/>
                       <strong>${item.subtotal?.toLocaleString()}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* STATUS CONTROLS */}
              <div className="status-control-area" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                      <span style={{fontWeight:'bold', marginRight:'10px'}}>Status:</span>
                      <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                          {order.status}
                      </span>
                  </div>

                  <select 
                      className="status-dropdown"
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      style={{ padding: '5px 10px' }}
                  >
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                  </select>
              </div>

>>>>>>> Stashed changes
            </div>
          ))
        )}
      </div>
    </>
  );
}