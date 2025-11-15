import React from 'react';
import { useOutletContext } from 'react-router-dom'; 
import '../../styles/admin/AdminLayout.css'; 
import ProductCard from '../../components/admin/ProductCard'; 

export default function AdminProductList() {
  // 3. Get everything from the parent AdminLayout
  const { 
    products, 
    loading, 
    error, 
    handleOpenAddModal, 
    handleOpenEditModal, 
    handleDelete 
  } = useOutletContext();

  return (
    <>
      <div className="content-header">
        <h2>PRODUCT MANAGEMENT</h2>
        {/* 6. This button calls the function from AdminLayout */}
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
    </>
  );
}