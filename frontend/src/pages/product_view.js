import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import ProductDetails from '../components/product_view/product_details';
import ProductReview from '../components/product_view/product_review';

const API_URL = 'http://localhost:8081/api/products';

export default function ProductView() {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]); 

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div>
            <ProductDetails product={product} />
            <ProductReview product={product} />
        </div>
    );
}