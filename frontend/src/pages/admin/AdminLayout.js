import React, { useState, useEffect, useCallback } from 'react'; 
import { Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin/AdminLayout.css'; 
import StatsCards from '../../components/admin/StatsCards';
import ProductFormModal from '../../components/admin/ProductFormModal'; 
import ProductViewModal from '../../components/admin/ProductViewModal';

// Define the product-specific URL
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;

export default function AdminLayout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Add modal state here
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState(null);

  // 4. Use useCallback for fetchProducts
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(PRODUCTS_API_URL);
      setProducts(response.data);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  

  // 5. All handlers live in this file now
  const handleOpenViewModal = (product) => {
    setProductToView(product);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setProductToView(null);
  };

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  // This is called by the modal
  const handleSuccess = () => {
    fetchProducts(); 
    handleCloseModal();
  };

  const handleDelete = async (productId) => {
    if (!window.confirm(`Are you sure you want to delete product ID ${productId}?`)) {
      return;
    }
    try {
      await axios.delete(`${PRODUCTS_API_URL}/${productId}`);
      alert('Product deleted successfully!');
      fetchProducts(); // Re-fetches products (updates list AND stat card)
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      alert(`Error deleting product: ${e.message}`);
    }
  };

  const stats = {
    productCount: loading ? '...' : products.length,
    totalOrders: 5,     
    pendingOrders: 2,
    returnRequest: 1,
    totalRevenue: '$ 5,257'
  };

  return (
    <div className="admin-container">
      <div className="admin-header" style={{textAlign: 'left'}}>
        <h1>MaJIX Admin</h1>
      </div>

      <StatsCards stats={stats} />

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
        <Outlet context={{ products, loading, error, handleOpenAddModal, handleOpenEditModal, handleOpenViewModal, handleDelete }} />
      </div>

      {isModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}

      {isViewModalOpen && (
        <ProductViewModal 
          product={productToView} 
          onClose={handleCloseViewModal} 
        />
      )}
    </div>
  );
}