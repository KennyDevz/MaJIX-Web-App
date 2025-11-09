import React from 'react';
import '../../styles/admin/ProductCard.css';

export default function ProductCard({ product, onDelete, onEdit }) {
  const displayVariant = product.variants[0];
  const stock = displayVariant ? displayVariant.quantityInStock : 0;

  return (
    <div className="product-card">
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
