import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductCard from './product_card'; 
import { Pagination, Box } from '@mui/material';

const API_URL = 'http://localhost:8081/api/products';
const DEFAULT_PRICE_RANGE = [0, 9999];
const ITEMS_PER_PAGE = 8; 

export default function ProductDisplay({ appliedCategory, appliedPriceRange = DEFAULT_PRICE_RANGE, appliedColors = [], appliedSizes = [], enablePagination = false, itemsPerPage = 8 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => { 
    if(enablePagination) window.scrollTo(0, 0);
  }, [enablePagination]);

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

  useEffect(() => {
    setPage(1);
  }, [appliedCategory, appliedPriceRange, appliedColors, appliedSizes]);

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const displayProducts = useMemo(() => {
    if (enablePagination) {
        const startIndex = (page - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    } 
    else {
        return filteredProducts.slice(0, itemsPerPage);
    }
  }, [filteredProducts, page, enablePagination, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  if (loading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', minHeight: enablePagination ? '400px' : 'auto'}}>
          {filteredProducts.length > 0 ? (
            displayProducts.map((product) => (
              <ProductCard
                key={product.productId} 
                product={product}       
              />
            ))
          ) : (
            <p>No products found for these filters.</p>
          )}
      </div>

      {enablePagination && filteredProducts.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent:'center', mt: 4, mb: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            sx={{ '& .MuiPaginationItem-root': { fontFamily: 'Poppins' } }}
          />
        </Box>
      )}
    </div>

  );
}