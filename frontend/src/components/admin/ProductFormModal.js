import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadImageService } from '../../services/UploadImageService';
import '../../styles/admin/ProductFormModal.css';

const API_BASE_URL = 'http://localhost:8081/api/products';

// --- 1. REMOVED COLOR_PRESETS ---
// We no longer need the hardcoded list or maps.

// --- 2. NEW HELPER: Convert Name to Hex using Browser API ---
const nameToHex = (name) => {
  if (!name) return null;
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillStyle = name;
  const computed = ctx.fillStyle;
  // If it changed from white, or if the user actually typed white
  if (computed !== '#ffffff' || name.toLowerCase() === 'white') {
    return computed;
  }
  return null; // Invalid color name
};

const BLANK_UI_VARIANT = {
  colorName: 'Black',
  colorHex: '#000000',
  price: 0,
  imageUrl: '',
  imageFile: null,
  stockS: 0, stockS_id: null,
  stockM: 0, stockM_id: null,
  stockL: 0, stockL_id: null,
  stockXL: 0, stockXL_id: null,
};

export default function ProductFormModal({ productToEdit, onClose, onSuccess }) {
  
  const [product, setProduct] = useState({ name: '', description: '', category: '' });
  const [uiVariants, setUiVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditMode = productToEdit != null;

  useEffect(() => {
    if (isEditMode) {
      setProduct({
        name: productToEdit.name,
        description: productToEdit.description,
        category: productToEdit.category,
      });

      // Condense variants
      const condensed = productToEdit.variants.reduce((acc, dbVariant) => {
        const colorHex = dbVariant.color;
        
        if (!acc[colorHex]) {
          acc[colorHex] = {
            // Without a preset map, we default the name to the hex code
            // or the user can rename it manually if they edit
            colorName: colorHex, 
            colorHex: colorHex,
            price: dbVariant.price,
            imageUrl: dbVariant.imageUrl,
            imageFile: null,
            stockS: 0, stockS_id: null,
            stockM: 0, stockM_id: null,
            stockL: 0, stockL_id: null,
            stockXL: 0, stockXL_id: null,
          };
        }
        
        switch (dbVariant.size) {
          case "S": acc[colorHex].stockS = dbVariant.quantityInStock; acc[colorHex].stockS_id = dbVariant.variantId; break;
          case "M": acc[colorHex].stockM = dbVariant.quantityInStock; acc[colorHex].stockM_id = dbVariant.variantId; break;
          case "L": acc[colorHex].stockL = dbVariant.quantityInStock; acc[colorHex].stockL_id = dbVariant.variantId; break;
          case "XL": acc[colorHex].stockXL = dbVariant.quantityInStock; acc[colorHex].stockXL_id = dbVariant.variantId; break;
          default: break;
        }
        return acc;
      }, {});
      setUiVariants(Object.values(condensed));
    } else {
      setProduct({ name: '', description: '', category: '' });
      setUiVariants([{ ...BLANK_UI_VARIANT }]);
    }
  }, [productToEdit, isEditMode]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  // --- 3. UPDATED HANDLER: Smart Sync without Presets ---
  const handleVariantChange = (index, e) => {
    const { name, value, files } = e.target;
    
    const newVariants = uiVariants.map((variant, i) => {
      if (i !== index) return variant;

      if (files) return { ...variant, imageFile: files[0], imageUrl: '' };

      // Case A: User types a name (e.g. "Salmon" or "#123456")
      if (name === 'colorName') {
        // Try to convert whatever they typed into a Hex
        const convertedHex = nameToHex(value);
        
        // If it's a valid color, update the picker too
        // If not (they are still typing), keep the old picker value
        return { 
          ...variant, 
          colorName: value, 
          colorHex: convertedHex || variant.colorHex 
        };
      }
      
      // Case B: User picks from the Color Picker
      if (name === 'colorHex') {
         return { 
           ...variant, 
           colorHex: value, 
           colorName: value // Update text to match the hex code
         };
      }

      return { ...variant, [name]: value };
    });
    setUiVariants(newVariants);
  };

  const addVariant = () => setUiVariants([...uiVariants, { ...BLANK_UI_VARIANT }]);
  const removeVariant = (index) => setUiVariants(uiVariants.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const variantImageUploads = uiVariants.map(v => 
        v.imageFile ? UploadImageService(v.imageFile) : Promise.resolve(v.imageUrl)
      );
      const uploadedImageUrls = await Promise.all(variantImageUploads);

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
          color: uiVariant.colorHex, // Always send the Hex to backend
          price: price,
          quantityInStock: sizeInfo.stock,
          imageUrl: imageUrl,
        }));
      });

      const mainProductImageUrl = finalVariantsForBackend[0]?.imageUrl;
      if (!mainProductImageUrl) {
        throw new Error("First variant image is missing or failed to upload.");
      }

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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            <p>{isEditMode ? 'Update product details.' : 'Create a new product.'}</p>
          </div>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>

        <div className="modal-body">
          <form id="product-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label>Product Name </label>
              <input type="text" name="name" value={product.name} onChange={handleProductChange} className="form-input" required />
            </div>
            
            <div className="form-group">
              <label>Category </label>
              <select name="category" value={product.category} onChange={handleProductChange} className="form-select" required >
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
              <textarea name="description" value={product.description} onChange={handleProductChange} className="form-textarea" />
            </div>

            <div className="variants-section">
              <div className="variants-header">
                <h3>Variant Inventory</h3>
                <button type="button" onClick={addVariant} className="add-variant-btn"> + Add Variant </button>
              </div>

              {uiVariants.map((variant, index) => (
                <div className="variant-card" key={index}>
                  
                  {/* --- 4. SIMPLIFIED COLOR INPUT (No Dropdown) --- */}
                  <div className="form-group">
                    <label>Color</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      
                      {/* The Color Picker */}
                      <input 
                        type="color" 
                        name="colorHex"
                        value={variant.colorHex}
                        onChange={(e) => handleVariantChange(index, e)}
                        style={{ width: '50px', height: '38px', padding: '0 5px', border: '1.33px solid #D1D5DC', borderRadius: '8px', cursor: 'pointer' }}
                      />

                      {/* The Text Input - Now accepts ANY valid color name */}
                      <input 
                        type="text" 
                        name="colorName" 
                        value={variant.colorName} 
                        onChange={(e) => handleVariantChange(index, e)} 
                        className="form-input"
                        placeholder="e.g. Red, Navy, #FF0000"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Price (₱) </label>
                    <input type="number" name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} className="form-input" required />
                  </div>

                  <div className="form-group">
                    <label>Variant Image {index === 0 && <span> (Default)</span>}</label>
                    <input type="file" name="imageFile" onChange={(e) => handleVariantChange(index, e)} className="form-input" />
                    {!variant.imageFile && variant.imageUrl && (
                      <div style={{fontSize: '0.8em', color: '#555', display: 'flex', alignItems: 'center', gap: '5px'}}>
                        Current: <img src={variant.imageUrl} alt="variant" style={{width: '30px', height: '30px'}} />
                      </div>
                    )}
                  </div>
                  
                  <div className="stock-grid">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <div className="form-group-inline" key={size}>
                        <label>{size}</label>
                        <input 
                          type="number" 
                          name={`stock${size}`} 
                          value={variant[`stock${size}`]} 
                          onChange={(e) => handleVariantChange(index, e)} 
                          className="form-input" 
                        />
                      </div>
                    ))}
                  </div>
                  
                  {uiVariants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(index)} className="remove-variant-btn">Remove Variant</button>
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="modal-footer">
            {error && <div style={{ color: 'red', marginRight: 'auto', fontSize: '14px' }}>Error: {error}</div>}
          <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
          <button type="submit" form="product-form" disabled={loading} className="btn-submit">
            {loading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Product')}
          </button>
        </div>

      </div>
    </div>
  );
} 