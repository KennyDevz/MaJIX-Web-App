import React from 'react';

// Assuming you'll use icons like Font Awesome, Material Icons, or your own SVG components
// For this example, I'll represent the icons with simple text.
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>; // Or better: 🟥 for the red box icon in the image

const ProductListItem = ({ product }) => {
  const { id, image, name, description } = product;

  const handleEdit = () => {
    console.log(`Editing product ${id}`);
    // Logic to open an edit form or navigate to an edit page
  };

  const handleDelete = () => {
    console.log(`Deleting product ${id}`);
    // Logic to confirm and delete the product
  };

  return (
    <div className="product-list-item">
      <div className="product-image">
        {/* In a real app, you would use an <img> tag with a dynamic source */}
         
      </div>
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
      </div>
      <div className="product-actions">
        <button className="action-button edit-button" onClick={handleEdit}>
          <EditIcon />
        </button>
        <button className="action-button delete-button" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
