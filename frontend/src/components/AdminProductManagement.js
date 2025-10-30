import React from 'react';
import AdminProductListItem from '../pages/AdminProductListItem';

const ProductManagement = ({ products }) => {
  const handleAddProduct = () => {
    console.log('Navigating to Add Product page...');
    // Logic to navigate to your product creation form
  };

  return (
    <div className="product-management-section">
      <div className="product-management-header">
        <h2 className="section-title">📦 PRODUCT MANAGEMENT</h2>
        <button className="add-product-button" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      <div className="product-list-container">
        {products.map(product => (
          <AdminProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;