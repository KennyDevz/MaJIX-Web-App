import React from 'react';
import '../../styles/admin/ProductCard.css';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function ProductCard({ product, onDelete, onEdit, onView }) {
  const stock = product.totalStock || 0;

  const LOW_STOCK_THRESHOLD = 10;

  const lowStockVariants = product.variants 
    ? product.variants.filter(v => v.quantityInStock <= LOW_STOCK_THRESHOLD) 
    : [];

  const hasLowStock = lowStockVariants.length > 0;


  return (
    <div className="product-card">

      {hasLowStock && (
        <div className="warning-icon-wrapper">
           <WarningAmberRoundedIcon sx={{ color: '#d32f2f', fontSize: '20px' }} />
        </div>
      )}

      <img
        src={product.imageUrl || 'https://placehold.co/124x124'}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-stock">Stock: {stock} units</div>
      </div>
      <div className="product-actions">
        <button onClick={() => onView(product)} className="action-btn view-btn">
          View
        </button>

        <button onClick={() => onEdit(product)} className="action-btn edit-btn">
          Edit
        </button>

        <button onClick={() => onDelete(product.productId)} className="action-btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
