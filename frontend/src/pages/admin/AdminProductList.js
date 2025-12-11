import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom'; 
import '../../styles/admin/AdminLayout.css'; 
import ProductCard from '../../components/admin/ProductCard'; 
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function AdminProductList() {
  const { 
    products, 
    loading, 
    error, 
    handleOpenAddModal, 
    handleOpenEditModal, 
    handleOpenViewModal,
    handleDelete 
  } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="content-header">
        <h2>PRODUCT MANAGEMENT</h2>
        
        <div style={{ display: 'flex', gap: '15px' }}>
            {/* --- NEW: Simple Search Input --- */}
            <TextField
                size="small"
                placeholder="Search products..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#9CA3AF' }} />
                        </InputAdornment>
                    ),
                    style: { 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        fontFamily: 'Poppins',
                        fontSize: '14px'
                    }
                }}
            />

            <button onClick={handleOpenAddModal} className="add-product-btn">
                <span>+</span>
                <span>Add Product</span>
            </button>
        </div>
      </div>

      <div className="product-list">
        {loading && <div>Loading products...</div>}
        {error && <div>Error fetching products: {error}</div>}
        
        {!loading && filteredProducts.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center', color: '#666', marginTop: '20px' }}>
                {searchTerm ? `No products found matching "${searchTerm}"` : "No products available."}
            </div>
        )}

        {/* Render FILTERED products instead of all products */}
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.productId} 
            product={product} 
            onDelete={handleDelete}
            onEdit={handleOpenEditModal} 
            onView={handleOpenViewModal}
          />
        ))}
      </div>
    </>
  );
}