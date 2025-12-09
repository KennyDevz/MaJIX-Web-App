import React from 'react';
import '../../styles/admin/ProductViewModal.css'; // We will create this CSS next
import { getColorName } from '../../utils/colorUtils';

export default function ProductViewModal({ product, onClose }) {
  if (!product) return null;

  // Calculate generic stats
  const totalStock = product.variants ? product.variants.reduce((acc, v) => acc + v.quantityInStock, 0) : 0;
  
  // Helper to format currency
  const formatPrice = (price) => `₱${parseFloat(price).toFixed(2)}`;

  return (
    <div className="view-modal-backdrop" onClick={onClose}>
      <div className="view-modal-content" onClick={e => e.stopPropagation()}>
        
        {/* --- Header --- */}
        <div className="view-modal-header">
          <div>
            <h2>{product.name}</h2>
            <span className="view-category-badge">{product.category}</span>
          </div>
          <button onClick={onClose} className="view-modal-close-btn">&times;</button>
        </div>

        <div className="view-modal-body">
            
            {/* --- Top Section: Main Info --- */}
            <div className="view-info-section">
                <div className="view-main-image">
                    <img 
                        src={product.imageUrl || 'https://placehold.co/150'} 
                        alt={product.name} 
                    />
                </div>
                <div className="view-details">
                    <p><strong>Description:</strong></p>
                    <p className="view-description">{product.description || "No description provided."}</p>
                    
                    <div className="view-stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">Total Stock</span>
                            <span className="stat-value">{totalStock}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Variants</span>
                            <span className="stat-value">{product.variants?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Bottom Section: Variant Table --- */}
            <div className="view-variants-section">
                <h3>Inventory Details</h3>
                <div className="view-table-wrapper">
                    <table className="view-variants-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.variants && product.variants.map((variant, index) => (
                                <tr key={index}>
                                    <td>
                                        <img 
                                            src={variant.imageUrl || product.imageUrl} 
                                            alt={`${variant.color} ${variant.size}`} 
                                            className="variant-thumb"
                                        />
                                    </td>
                                    <td>
                                        <div className="color-cell">
                                            <span 
                                                className="color-dot" 
                                                style={{ backgroundColor: variant.color }}
                                            ></span>
                                            {getColorName(variant.color)}
                                        </div>
                                    </td>
                                    <td><span className="size-badge">{variant.size}</span></td>
                                    <td>{formatPrice(variant.price)}</td>
                                    <td style={{ fontWeight: 600 }}>{variant.quantityInStock}</td>
                                    <td>
                                        {variant.quantityInStock === 0 ? (
                                            <span className="status-badge nostock">No Stock</span>
                                        ) : variant.quantityInStock <= 5 ? (
                                            <span className="status-badge low">Low Stock</span>
                                        ) : (
                                            <span className="status-badge ok">In Stock</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {(!product.variants || product.variants.length === 0) && (
                                <tr>
                                    <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No variants found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        
        <div className="view-modal-footer">
            <button onClick={onClose} className="btn-close">Close</button>
        </div>
      </div>
    </div>
  );
}