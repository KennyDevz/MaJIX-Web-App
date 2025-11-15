import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/ProductList.css'; 
import ProductCard from '../components/admin/ProductCard'; 
import ProductFormModal from '../components/admin/ProductFormModal'; 

const API_URL = 'http://localhost:8081/api/products';

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 


const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
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

  // --- 4. Handlers for managing the modal ---

  const handleOpenAddModal = () => {
    setProductToEdit(null); // Set to null for "Add" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product); // Pass the product to "Edit" mode
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  // This is called by the modal on a successful save
  const handleSuccess = () => {
    fetchProducts(); // Re-fetch all products to show changes
    handleCloseModal(); // Close the modal
  };


  const handleDelete = async (productId) => {
    if (!window.confirm(`Are you sure you want to delete product ID ${productId}?`)) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${productId}`);
      setProducts(products.filter(p => p.productId !== productId));
      alert('Product deleted successfully!');

    } catch (e) {
      setError(e.response?.data?.message || e.message);
      alert(`Error deleting product: ${e.message}`);
    }
  };

  return (
  <>
      <div className="content-header">
        <h2>PRODUCT MANAGEMENT</h2>
        <button onClick={handleOpenAddModal} className="add-product-btn">
          <span>+</span>
          <span>Add Product</span>
        </button>
      </div>

      <div className="product-list">
        {loading && <div>Loading products...</div>}
        {error && <div>Error fetching products: {error}</div>}
        
        {products.map(product => (
          <ProductCard 
            key={product.productId} 
            product={product} 
            onDelete={handleDelete}
            onEdit={handleOpenEditModal} 
          />
        ))}
      </div>

      {isModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
  
  {/*<div className="admin-container">
      {/* Header }
      <div className="admin-header">
        <h1>MaJIX Admin</h1>
      </div>

      {/* Stats Cards }
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p> {/* This one is dynamic! }
        </div>
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

      {/* Navigation Tabs }
      <div className="admin-tabs">
        <div className="tab-item active">Products</div>
        <div className="tab-item">Orders</div>
        <div className="tab-item">Returns</div>
        <div className="tab-item">Customers</div>
      </div>

      {/* Main Content Area }
      <div className="content-area">
        <div className="content-header">
          <h2>PRODUCT MANAGEMENT</h2>
          
          {/* --- 5. Changed Link to a button with onClick --- }
          <button onClick={handleOpenAddModal} className="add-product-btn">
            <span>+</span>
            <span>Add Product</span>
          </button>
        </div>

        {/* Product List }
        <div className="product-list">
          {loading && <div>Loading products...</div>}
          {error && <div>Error fetching products: {error}</div>}
          
          {products.map(product => (
            <ProductCard 
              key={product.productId} 
              product={product} 
              onDelete={handleDelete}
              onEdit={handleOpenEditModal} // <-- 6. Pass the new handler
            />
          ))}
        </div>
      </div>

      {/* --- 7. Conditionally render the modal --- }
      {isModalOpen && (
        <ProductFormModal
          productToEdit={productToEdit}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );*/}
}
