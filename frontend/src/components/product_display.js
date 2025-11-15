import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductCard from './product_card'; 

const API_URL = 'http://localhost:8081/api/products';
const DEFAULT_PRICE_RANGE = [0, 9999];

export default function ProductDisplay({ appliedCategory, appliedPriceRange = DEFAULT_PRICE_RANGE, appliedColors = [], appliedSizes = []}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { //scrolls to the top of component
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

const filteredProducts = useMemo(() => {

    if (!Array.isArray(products)) {
      return [];
    }

    const safeAppliedColors = Array.isArray(appliedColors) ? appliedColors : [];
    const safeAppliedSizes = Array.isArray(appliedSizes) ? appliedSizes : [];
    const [minPrice, maxPrice] = appliedPriceRange;

    return products.filter(product => {

      if (appliedCategory && product.category !== appliedCategory) {
        return false; 
      }
      const inPriceRange = product.variants.some(variant => 
        variant.price >= minPrice && variant.price <= maxPrice
      );
      if (!inPriceRange) {
        return false; 
      }

      if (safeAppliedColors.length > 0) {
        const inColor = product.variants.some(variant => 
          safeAppliedColors.includes(variant.color)
        );
        if (!inColor) {
          return false; 
        }
      }

      if (safeAppliedSizes.length > 0) {
        const inSize = product.variants.some(variant => 
          safeAppliedSizes.includes(variant.size) && variant.quantityInStock > 0
        );
        if (!inSize) {
          return false; 
        }
      }
     
      return true;
    });
    
  }, [products, appliedCategory, appliedPriceRange, appliedColors, appliedSizes]); 

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.productId} 
                product={product}       
              />
            ))
          ) : (
            <p>No products found for these filters.</p>
          )}
      </div>
    </div>

  );
}