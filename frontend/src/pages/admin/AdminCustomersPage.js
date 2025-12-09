import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminCustomersPage.css';

// --- MOCK DATA (For testing) ---
const mockMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    type: 'Inquiry',
    message: 'Do you have this shirt in size XXL? I looked everywhere on the site but the option seems grayed out. I really need this for a wedding next week.',
    status: 'OPEN',
    createdAt: '2024-02-10T10:30:00',
    adminResponse: null
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    type: 'Complaint',
    message: 'My delivery was delayed by 3 days. I want a refund immediately or I will file a chargeback.',
    status: 'RESOLVED',
    createdAt: '2024-02-08T14:15:00',
    adminResponse: 'We apologize for the delay. A 10% coupon has been sent to your email.'
  },
  {
    id: 3,
    name: 'Mike Ross',
    email: 'mike@example.com',
    type: 'Feedback',
    message: 'Great quality on the hoodies! Will buy again.',
    status: 'OPEN',
    createdAt: '2024-02-11T09:00:00',
    adminResponse: null
  }
];

export default function AdminCustomersPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Modal & Reply States
  const [selectedMessage, setSelectedMessage] = useState(null); // Controls the Modal
  const [replyText, setReplyText] = useState("");

  // Fetch Messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/contact/all");
        setMessages(response.data);
      } catch (e) {
        console.error("Using mock data:", e);
        setMessages(mockMessages);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Handle Send Reply
  const handleSendReply = async () => {
    if (!replyText.trim()) return alert("Please type a response");
    
    const id = selectedMessage.id;
    
    try {
      await axios.put(`http://localhost:8080/api/contact/respond/${id}`, replyText, {
         headers: { "Content-Type": "text/plain" }
      });
      alert("Response sent successfully!");
      
      // Update local state
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, status: 'RESOLVED', adminResponse: replyText } : msg
      );
      setMessages(updatedMessages);
      
      // Close Modal
      setSelectedMessage(null);
      setReplyText("");
    } catch (error) {
      alert("Failed to send response.");
    }
  };

  // Filter Logic
  const filteredMessages = messages.filter(msg => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      msg.email.toLowerCase().includes(searchLower) ||
      msg.name.toLowerCase().includes(searchLower)
    );
    const matchesType = filterType === 'All' || msg.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="content-header">
        <h2>INQUIRIES & COMPLAINTS</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
            <select
                className="customer-search-input"
                style={{ width: '180px', cursor: 'pointer' }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="All">All Types</option>
                <option value="Inquiry">General Inquiry</option>
                <option value="Complaint">Complaint</option>
                <option value="Feedback">Feedback</option>
                <option value="Order Issue">Order Issue</option>
            </select>
            <input
                type="text"
                className="customer-search-input"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="customer-list">
        {loading && <div>Loading messages...</div>}
        
        {filteredMessages.map((msg) => (
          <div className="customer-card" key={msg.id} style={{ borderLeft: msg.status === 'OPEN' ? '6px solid #ffc107' : '6px solid #28a745' }}>
            {/* COMPACT VIEW */}
            <div className="customer-card-header">
              <h3>{msg.name}</h3>
              <span style={{ 
                padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                backgroundColor: msg.status === 'OPEN' ? '#fff3cd' : '#d4edda',
                color: msg.status === 'OPEN' ? '#856404' : '#155724'
              }}>
                {msg.status}
              </span>
            </div>

            <div className="customer-card-body">
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600', color: '#555' }}>{msg.type}</span>
                    <span style={{ color: '#888', fontSize: '0.9em' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
               </div>
               <p style={{ color: '#666', fontSize: '0.95em', margin: 0 }}>{msg.email}</p>
            </div>

            <div className="customer-card-footer">
               <button 
                  className="view-details-btn" 
                  style={{ width: '100%', marginTop: '10px' }}
                  onClick={() => {
                      setSelectedMessage(msg);
                      setReplyText(""); // Reset reply text
                  }}
               >
                  View Details & Reply
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL POPUP --- */}
      {selectedMessage && (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <h2 style={{ margin: 0 }}>{selectedMessage.type} Details</h2>
                    <button onClick={() => setSelectedMessage(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
                </div>

                {/* Message Details */}
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                    <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> {selectedMessage.status}</p>
                    
                    <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '10px' }}>
                        <strong style={{ display: 'block', marginBottom: '5px' }}>Message:</strong>
                        {selectedMessage.message}
                    </div>
                </div>

                {/* Admin Response Section */}
                {selectedMessage.adminResponse ? (
                    <div style={{ background: '#e2e6ea', padding: '15px', borderRadius: '5px', borderLeft: '4px solid green', marginBottom: '20px' }}>
                        <strong style={{ color: 'green' }}>✓ Response Sent:</strong>
                        <p style={{ marginTop: '5px' }}>{selectedMessage.adminResponse}</p>
                    </div>
                ) : (
                    // Reply Form (Only if no response yet)
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ fontWeight: 'bold' }}>Write a Reply:</label>
                        <textarea
                            rows="4"
                            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                            placeholder="Type your response to the customer here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <button 
                            style={{ 
                                backgroundColor: '#000', color: '#fff', padding: '10px 20px', 
                                border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                            onClick={handleSendReply}
                        >
                            Send Reply
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </>
  );
}

// --- INLINE STYLES FOR MODAL ---
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '600px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};



{/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminCustomersPage.css';

// Mock data for development (remove when API is ready)
const mockCustomers = [
  {
    userId: 1,
    email: 'john.doe@example.com',
    firstname: 'John',
    lastname: 'Doe',
    phonenumber: '123-456-7890',
    role: 'CUSTOMER',
    totalOrders: 5,
    totalSpent: 450.75,
    joinDate: '2024-01-01',
  },
  {
    userId: 2,
    email: 'jane.smith@example.com',
    firstname: 'Jane',
    lastname: 'Smith',
    phonenumber: '234-567-8901',
    role: 'CUSTOMER',
    totalOrders: 3,
    totalSpent: 280.50,
    joinDate: '2024-01-05',
  },
  {
    userId: 3,
    email: 'bob.johnson@example.com',
    firstname: 'Bob',
    lastname: 'Johnson',
    phonenumber: '345-678-9012',
    role: 'CUSTOMER',
    totalOrders: 8,
    totalSpent: 720.25,
    joinDate: '2023-12-15',
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with actual API call when backend endpoint is ready
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 500);

    // When API is ready, use this:
    // const fetchCustomers = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/customers`);
    //     setCustomers(response.data);
    //   } catch (e) {
    //     setError(e.response?.data?.message || e.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.email.toLowerCase().includes(searchLower) ||
      customer.firstname.toLowerCase().includes(searchLower) ||
      customer.lastname.toLowerCase().includes(searchLower) ||
      `${customer.firstname} ${customer.lastname}`.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="content-header">
        <h2>CUSTOMER MANAGEMENT</h2>
        
        <input
          type="text"
          className="customer-search-input"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="customer-list">
        {loading && <div>Loading customers...</div>}
        {error && <div className="error-message">Error: {error}</div>}
        
        {filteredCustomers.length === 0 && !loading && (
          <div className="no-data">
            {searchTerm ? 'No customers found matching your search' : 'No customers found'}
          </div>
        )}

        {filteredCustomers.map((customer) => (
          <div className="customer-card" key={customer.userId}>
            <div className="customer-card-header">
              <h3>{customer.firstname} {customer.lastname}</h3>
              <span className="customer-email">{customer.email}</span>
            </div>

            <div className="customer-card-body">
              <div className="customer-detail-section">
                <h4>Contact Information</h4>
                <p>
                  <strong>Phone:</strong> {customer.phonenumber || 'N/A'}
                </p>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
              </div>
              <div className="customer-detail-section">
                <h4>Account Statistics</h4>
                <p>
                  <strong>Total Orders:</strong> {customer.totalOrders || 0}
                </p>
                <p>
                  <strong>Total Spent:</strong> ${(customer.totalSpent || 0).toFixed(2)}
                </p>
              </div>
              <div className="customer-detail-section">
                <h4>Account Details</h4>
                <p>
                  <strong>Member Since:</strong> {customer.joinDate || 'N/A'}
                </p>
                <p>
                  <strong>Role:</strong> {customer.role || 'CUSTOMER'}
                </p>
              </div>
            </div>

            <div className="customer-card-footer">
              <button className="view-details-btn">
                View Details
              </button>
              <button className="view-orders-btn">
                View Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}*/}

