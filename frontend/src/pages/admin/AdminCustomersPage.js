import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // Updated useEffect to fetch real data
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        // This endpoint matches the AdminController we just created
        const response = await axios.get(`${API_BASE_URL}/admin/customers`);
        setCustomers(response.data);
      } catch (e) {
        console.error("Error fetching customers:", e);
        setError("Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
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
              <button className="view-orders-btn"
                onClick={() => navigate(`/admin/orders?email=${customer.email}`)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

