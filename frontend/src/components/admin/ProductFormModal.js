import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadImageService } from '../../services/UploadImageService'; 
import '../../styles/admin/ProductFormModal.css'; 

const API_BASE_URL = 'http://localhost:8081/api/products';

const BLANK_UI_VARIANT = {
  color: '#000000',
  price: 0,
  imageUrl: '',
  imageFile: null,
  stockS: 0, stockS_id: null,
  stockM: 0, stockM_id: null,
  stockL: 0, stockL_id: null,
  stockXL: 0, stockXL_id: null,
};

export default function ProductFormModal({ productToEdit, onClose, onSuccess }) {
  
  // --- 1. Smart State Initialization ---
  const [product, setProduct] = useState({ name: '', description: '', category: '' });
  const [uiVariants, setUiVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if we are in "Edit Mode"
  const isEditMode = productToEdit != null;

  useEffect(() => {
    if (isEditMode) {
      // --- EDIT MODE ---
      setProduct({
        name: productToEdit.name,
        description: productToEdit.description,
        category: productToEdit.category,
      });

      //Logic para ma usa ang mga stock quantities per size and color(Possible pa ma mubo ang code if ang products variant entity naay size for S M L XL)
      // "Condense" the product variants from the database
      const condensed = productToEdit.variants.reduce((acc, dbVariant) => {
        const color = dbVariant.color;
        if (!acc[color]) {
          acc[color] = {
            color: dbVariant.color,
            price: dbVariant.price,
            imageUrl: dbVariant.imageUrl,
            imageFile: null,
            stockS: 0, stockS_id: null,
            stockM: 0, stockM_id: null,
            stockL: 0, stockL_id: null,
            stockXL: 0, stockXL_id: null,
          };
        }
        // Assign stock and ID based on size
        switch (dbVariant.size) {
          case "S": acc[color].stockS = dbVariant.quantityInStock; acc[color].stockS_id = dbVariant.variantId; break;
          case "M": acc[color].stockM = dbVariant.quantityInStock; acc[color].stockM_id = dbVariant.variantId; break;
          case "L": acc[color].stockL = dbVariant.quantityInStock; acc[color].stockL_id = dbVariant.variantId; break;
          case "XL": acc[color].stockXL = dbVariant.quantityInStock; acc[color].stockXL_id = dbVariant.variantId; break;
          default: break;
        }
        return acc;
      }, {});
      setUiVariants(Object.values(condensed));
    } else {
      // --- ADD MODE ---
      // We are adding, so start with a blank form
      setProduct({ name: '', description: '', category: '' });
      setUiVariants([{ ...BLANK_UI_VARIANT }]);
    }
  }, [productToEdit, isEditMode]); // Rerun this logic if the product to edit changes

  
  // --- (All event handlers are identical to EditProductForm) ---
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value, files } = e.target;
    const newVariants = uiVariants.map((variant, i) => {
      if (i === index) {
        if (files) return { ...variant, imageFile: files[0], imageUrl: '' };
        return { ...variant, [name]: value };
      }
      return variant;
    });
    setUiVariants(newVariants);
  };

  const addVariant = () => setUiVariants([...uiVariants, { ...BLANK_UI_VARIANT }]);
  const removeVariant = (index) => setUiVariants(uiVariants.filter((_, i) => i !== index));

  
  // --- 2. Smart HandleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // --- A. Upload Images ---
      const variantImageUploads = uiVariants.map(v => 
        v.imageFile ? UploadImageService(v.imageFile) : Promise.resolve(v.imageUrl)
      );
      const uploadedImageUrls = await Promise.all(variantImageUploads);

      // --- B. "Un-condense" Variants (same as EditForm) ---
      const finalVariantsForBackend = uiVariants.flatMap((uiVariant, index) => {
        const imageUrl = uploadedImageUrls[index];
        const price = parseFloat(uiVariant.price);
        const sizes = [
          { name: "S", stock: parseInt(uiVariant.stockS, 10) || 0, id: uiVariant.stockS_id },
          { name: "M", stock: parseInt(uiVariant.stockM, 10) || 0, id: uiVariant.stockM_id },
          { name: "L", stock: parseInt(uiVariant.stockL, 10) || 0, id: uiVariant.stockL_id },
          { name: "XL", stock: parseInt(uiVariant.stockXL, 10) || 0, id: uiVariant.stockXL_id }
        ];
        return sizes.map(sizeInfo => ({
          variantId: sizeInfo.id,
          size: sizeInfo.name,
          color: uiVariant.color,
          price: price,
          quantityInStock: sizeInfo.stock,
          imageUrl: imageUrl,
        }));
      });

      const mainProductImageUrl = finalVariantsForBackend[0]?.imageUrl;
      if (!mainProductImageUrl) {
        throw new Error("First variant image is missing or failed to upload.");
      }

      // --- C. Build Payload ---
      const payload = {
        product: { ...product, imageUrl: mainProductImageUrl },
        variants: finalVariantsForBackend,
      };



      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/${productToEdit.productId}`, payload);
      } else {
        await axios.post(API_BASE_URL, payload);
      }

      alert(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      onSuccess(); 
      
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Render with Modal Backdrop ---
 return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            <p>
              {isEditMode 
                ? 'Update the product details, variants, pricing, and stock.'
                : 'Create a new product with variant details, pricing, images, and stock quantities.'
              }
            </p>
          </div>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>

        <div className="modal-body">
          <form id="product-form" onSubmit={handleSubmit}>
            
            {/* --- Product Details --- */}
            <div className="form-group">
              <label>Product Name </label>
              <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleProductChange} 
                className="form-input"
                placeholder="Enter product name..."
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Category </label>
              <select 
                name="category" 
                value={product.category} 
                onChange={handleProductChange} 
                className="form-select" 
                required
              >
                <option value="">Select Category</option>
                <option value="T-Shirt">T-shirt</option>
                <option value="Pants">Pants</option>
                <option value="Shirt">Shorts</option>
                <option value="Jeans">Jeans</option>
                <option value="Hoodie">Hoodie</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description" 
                value={product.description} 
                onChange={handleProductChange} 
                className="form-textarea"
                placeholder="Enter product description..."
              />
            </div>

            {/* --- Variants Section --- */}
            <div className="variants-section">
              <div className="variants-header">
                <h3>Variant Inventory</h3>
                <button type="button" onClick={addVariant} className="add-variant-btn">
                  + Add Variant
                </button>
              </div>

              {uiVariants.map((variant, index) => (
                <div className="variant-card" key={index}>
                  
                  <div className="form-group">
                    <label>Color *</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {/* The Color Picker */}
                      <input 
                        type="color" 
                        name="color"
                        // Use a valid hex. Default to black if state is invalid
                        value={variant.color && /^#[0-9A-F]{6}$/i.test(variant.color) ? variant.color : '#000000'}
                        onChange={(e) => handleVariantChange(index, e)}
                        style={{
                          width: '50px', 
                          height: '40px', 
                          padding: '0 5px',
                          border: '1.33px solid #D1D5DC', // Match form-input
                          borderRadius: '8px'
                        }}
                      />
                      {/* The Text Input */}
                      <input 
                        type="text" 
                        name="color" 
                        value={variant.color} 
                        onChange={(e) => handleVariantChange(index, e)} 
                        className="form-input"
                        placeholder="e.g., #FF0000"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Price (₱) </label>
                    <input 
                      type="number" 
                      name="price" 
                      value={variant.price} 
                      onChange={(e) => handleVariantChange(index, e)} 
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Variant Image  {index === 0 && <span> (Will be default product image)</span>}
                    </label>
                    <input 
                      type="file" 
                      name="imageFile" 
                      onChange={(e) => handleVariantChange(index, e)} 
                      className="form-input"
                    />
                    {!variant.imageFile && variant.imageUrl && (
                      <div style={{fontSize: '0.8em', color: '#555', display: 'flex', alignItems: 'center', gap: '5px'}}>
                        Current: <img src={variant.imageUrl} alt="variant" style={{width: '30px', height: '30px'}} />
                      </div>
                    )}
                  </div>
                  
                  <div className="stock-grid">
                    <div className="form-group-inline">
                      <label>Size S</label>
                      <input type="number" name="stockS" value={variant.stockS} onChange={(e) => handleVariantChange(index, e)} className="form-input" />
                    </div>
                    <div className="form-group-inline">
                      <label>Size M</label>
                      <input type="number" name="stockM" value={variant.stockM} onChange={(e) => handleVariantChange(index, e)} className="form-input" />
                    </div>
                    <div className="form-group-inline">
                      <label>Size L</label>
                      <input type="number" name="stockL" value={variant.stockL} onChange={(e) => handleVariantChange(index, e)} className="form-input" />
                    </div>
                    <div className="form-group-inline">
                      <label>Size XL</label>
                      <input type="number" name="stockXL" value={variant.stockXL} onChange={(e) => handleVariantChange(index, e)} className="form-input" />
                    </div>
                  </div>
                  
                  {uiVariants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(index)} className="remove-variant-btn">
                      Remove Variant
                    </button>
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="modal-footer">

            {error && (
                <div style={{ color: 'red', marginRight: 'auto', fontFamily: 'Inter', fontSize: '14px' }}>
                Error: {error}
                </div>
            )}
            
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button 
            type="submit" 
            form="product-form" 
            disabled={loading} 
            className="btn-submit"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Product')}
          </button>
        </div>

      </div>
    </div>
  );
}
