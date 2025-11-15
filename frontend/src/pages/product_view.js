import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from "@mui/material"; 
import { UserContext } from '../context/UserContext'; 
import ProductDetails from "../components/product_view/product_details";
import ProductReview from "../components/product_view/product_review";
import ReviewForm from "../components/product_view/review_form"; 
import BreadCrumbs from "../components/breadcrumbs"; 

const API_URL = 'http://localhost:8081/api/products';

export default function ProductView(){
    
    const { productId } = useParams();
    const { user } = useContext(UserContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/${productId}`);
            setProduct(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId, fetchProduct]); 

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    if (loading) { return <div>Loading product...</div>; }
    if (error) { return <div>Error: {error}</div>; }
    if (!product) { return <div>Product not found.</div>; }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, paddingLeft: "80px", mt: 2 }}>
        <BreadCrumbs page="Product View" />
        
        <ProductDetails product={product} />
        
        <ReviewForm 
          productId={product.productId} 
          userId={user?.id} 
          onReviewSubmitted={fetchProduct} 
        />

        <Typography variant="h5" fontWeight="700" mt={4}>
          Rating & Reviews ({product.reviews ? product.reviews.length : 0})
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: "90%"}}>
          {product.reviews && product.reviews.map(review => (
            <ProductReview
                key={review.reviewId}
                name={review.customerName}
                text={review.comment}
                rating={review.rating} 
                date={new Date(review.datePosted).toLocaleDateString()}
            />
          ))}
          {(!product.reviews || product.reviews.length === 0) && (
            <Typography>Be the first to review this product!</Typography>
          )}
        </Box>
      </Box>
    );
}