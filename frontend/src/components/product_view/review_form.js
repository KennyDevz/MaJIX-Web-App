import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button } from "@mui/material";

/**
 * This is a self-contained form for adding a new review.
 * It manages its own state for the rating and comment.
 */
export default function ReviewForm({ productId }) { // Pass productId as a prop
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        // TODO: This is where you'll send the data to your backend API
        // For now, we'll just log it to the console.
        console.log({
            productId: productId, // Use the prop
            rating: rating,
            comment: comment
        });

        // Reset the form
        setRating(0);
        setComment("");
    };

    return (
        <Box sx={{ mt: 4, mb: 2, p: 3, border: '1px solid #eee', borderRadius: 2, width: "90%", boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                Write a Review
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                 <Typography component="legend" mr={1} fontWeight="500">Your Rating:</Typography>
                 <Rating
                    name="new-review-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>
            <TextField
                label="Your Review"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ 
                    backgroundColor: '#000', 
                    color: '#fff',
                    '&:hover': { backgroundColor: '#333' } 
                }}
            >
                Submit Review
            </Button>
        </Box>
    );
}

