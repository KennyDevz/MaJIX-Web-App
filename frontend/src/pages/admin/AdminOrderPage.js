import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminOrderPage.css';
import { getColorName } from '../../utils/colorUtils';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Hooks for URL params
  const location = useLocation();
  const navigate = useNavigate();

  // Extract email from URL 
  const queryParams = new URLSearchParams(location.search);
  const filterEmail = queryParams.get('email');

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
    // Status Filter
    const matchesStatus = filter === 'all' || order.status?.toLowerCase() === filter.toLowerCase();
    
    // Email Filter (New)
    // Checks if URL has email; if so, does it match this order's customerEmail?
    const matchesEmail = filterEmail ? order.customerEmail === filterEmail : true;

    return matchesStatus && matchesEmail;

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

      {/* SHOW BANNER IF FILTERING BY CUSTOMER */}
      {filterEmail && (
        <div style={{ 
            backgroundColor: '#e3f2fd', 
            padding: '10px 15px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #90caf9'
        }}>
            <span style={{ color: '#0d47a1' }}>
                Showing orders for customer: <strong>{filterEmail}</strong>
            </span>
            <button 
                onClick={() => navigate('/admin/orders')}
                style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #0d47a1',
                    color: '#0d47a1',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Clear Filter
            </button>
        </div>
      )}

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
                         Size: {item.size} | Color: {getColorName(item.color)}
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
                      disabled={order.status === "CANCELLED"}
                  >
                      <option value="PENDING" disabled={order.status === 'SHIPPED' || order.status === 'DELIVERED'}>PENDING</option>
                      <option value="SHIPPED" disabled={order.status === 'DELIVERED'}>SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                  </select>
              </div>

            </div>
          ))
        )}
      </div>
    </>
  );
}