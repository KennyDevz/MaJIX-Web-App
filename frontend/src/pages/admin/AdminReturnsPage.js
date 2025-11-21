import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminReturnsPage.css';

// Mock data for development (remove when API is ready)
const mockReturns = [
  {
    returnId: 1,
    reason: 'Defective item',
    status: 'Pending',
    requestDate: '2024-01-15',
    orderId: '12345',
    customerName: 'John Doe',
    productName: 'Classic Black Hoodie',
  },
  {
    returnId: 2,
    reason: 'Wrong size',
    status: 'Approved',
    requestDate: '2024-01-10',
    orderId: '12346',
    customerName: 'Jane Smith',
    productName: 'MaJiX Polo Shirt',
  },
  {
    returnId: 3,
    reason: 'Changed mind',
    status: 'Rejected',
    requestDate: '2024-01-08',
    orderId: '12347',
    customerName: 'Bob Johnson',
    productName: 'Vintage Logo Tee',
  },
];

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // TODO: Replace with actual API call when backend endpoint is ready
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReturns(mockReturns);
      setLoading(false);
    }, 500);

    // When API is ready, use this:
    // const fetchReturns = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/returns`);
    //     setReturns(response.data);
    //   } catch (e) {
    //     setError(e.response?.data?.message || e.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchReturns();
  }, []);

  const filteredReturns = filterStatus === 'all' 
    ? returns 
    : returns.filter(r => r.status.toLowerCase() === filterStatus.toLowerCase());

  const handleStatusUpdate = async (returnId, newStatus) => {
    try {
      // TODO: Replace with actual API call when backend endpoint is ready
      setReturns(returns.map(r => 
        r.returnId === returnId ? { ...r, status: newStatus } : r
      ));
      alert(`Return ${returnId} status updated to ${newStatus}`);
      
      // When API is ready, use this:
      // await axios.put(`${API_BASE_URL}/returns/${returnId}`, { status: newStatus });
      // fetchReturns(); // Re-fetch returns
    } catch (e) {
      alert(`Error updating return: ${e.message}`);
    }
  };

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
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
                {returnItem.status === 'Pending' && (
                  <>
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleStatusUpdate(returnItem.returnId, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => handleStatusUpdate(returnItem.returnId, 'Rejected')}
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

