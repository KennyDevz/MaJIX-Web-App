import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios'; // <-- Import axios
import { API_BASE_URL } from '../../apiConfig'; // <-- Import your new config
import '../../styles/admin/ProductList.css'; 

// Define the product-specific URL
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;

export default function AdminLayout() {
  // --- 1. State lifted up from AdminProductList ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. Logic lifted up from AdminProductList ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PRODUCTS_API_URL);
      setProducts(response.data);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm(`Are you sure you want to delete product ID ${productId}?`)) {
      return;
    }
    try {
      await axios.delete(`${PRODUCTS_API_URL}/${productId}`);
      // Re-fetch products to update the list
      fetchProducts(); 
      alert('Product deleted successfully!');

    } catch (e) {
      setError(e.response?.data?.message || e.message);
      alert(`Error deleting product: ${e.message}`);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header" style={{textAlign: 'left'}}>
        <h1>MaJIX Admin</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          {/* --- 3. Stat card is now dynamic! --- */}
          <p>{loading ? '...' : products.length}</p>
        </div>
        {/* ...other stat cards... */}
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Return Request</h3>
          <p>1</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>$ 5,257</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <NavLink to="/admin/products" className="tab-item">Products</NavLink>
        <NavLink to="/admin/orders" className="tab-item">Orders</NavLink>
        <NavLink to="/admin/returns" className="tab-item">Returns</NavLink>
        <NavLink to="/admin/customers" className="tab-item">Customers</NavLink>
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        {/* --- 4. Pass all data and functions down via context --- */}
        <Outlet context={{ products, loading, error, fetchProducts, handleDelete }} />
      </div>
    </div>
  );
}