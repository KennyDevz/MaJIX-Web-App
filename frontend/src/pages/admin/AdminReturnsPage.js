import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminReturnsPage.css';

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // --- 1. Fetch Returns from Backend ---
  const fetchReturns = async () => {
    setLoading(true);
    try {
      // Calls GET http://localhost:8081/api/returns
      const response = await axios.get(`${API_BASE_URL}/returns`);
      setReturns(response.data);
      setError(null);
    } catch (e) {
      console.error("Error fetching returns:", e);
      setError(e.response?.data?.message || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  // --- 2. Update Return Status ---
  const handleStatusUpdate = async (returnId, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this return as ${newStatus}?`)) {
      return;
    }

    try {
      // Calls PUT http://localhost:8081/api/returns/{id}/status
      await axios.put(`${API_BASE_URL}/returns/${returnId}/status`, { 
        status: newStatus 
      });
      
      alert(`Return request marked as ${newStatus}.`);
      fetchReturns(); // Refresh the list to show updated status
    } catch (e) {
      console.error("Error updating status:", e);
      alert(`Error updating return: ${e.response?.data || e.message}`);
    }
  };

  // Filter Logic
  const filteredReturns = filterStatus === 'all' 
    ? returns 
    : returns.filter(r => (r.status || '').toLowerCase() === filterStatus.toLowerCase());

  // Helper for styling status badges
  const getStatusClass = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'approved') return 'status-approved';
    if (statusLower === 'rejected') return 'status-rejected';
    return 'status-pending';
  };

  return (
    <>
      <div className="content-header">
        <h2>RETURN MANAGEMENT</h2>
        
        <select 
          className="return-filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Returns</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="return-list">
        {loading && <div>Loading returns...</div>}
        {error && <div className="error-message">Error: {error}</div>}
        
        {filteredReturns.length === 0 && !loading && (
          <div className="no-data">No returns found</div>
        )}

        {filteredReturns.map((returnItem) => (
          <div className="return-card" key={returnItem.returnId}>
            <div className="return-card-header">
              <h3>Return #{returnItem.returnId}</h3>
              <span className={`return-status ${getStatusClass(returnItem.status)}`}>
                {returnItem.status}
              </span>
            </div>

            <div className="return-card-body">
              <div className="return-detail-section">
                <h4>Customer</h4>
                <p>{returnItem.customerName}</p>
              </div>
              <div className="return-detail-section">
                <h4>Order ID</h4>
                <p>#{returnItem.orderId}</p>
              </div>
              <div className="return-detail-section">
                <h4>Product</h4>
                <p>{returnItem.productName}</p>
                {/* Optional: Display Quantity if available in DTO */}
                {returnItem.quantity && (
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Qty: {returnItem.quantity}</p>
                )}
              </div>
              <div className="return-detail-section">
                <h4>Request Date</h4>
                <p>{returnItem.requestDate}</p>
              </div>
            </div>

            <div className="return-card-footer">
              <div className="return-reason">
                <h4>Reason for Return</h4>
                <p>{returnItem.reason}</p>
              </div>
              
              <div className="return-actions">
                {/* Only show buttons if status is PENDING (case-insensitive check) */}
                {(returnItem.status || '').toLowerCase() === 'pending' && (
                  <>
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleStatusUpdate(returnItem.returnId, 'APPROVED')}
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => handleStatusUpdate(returnItem.returnId, 'REJECTED')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}