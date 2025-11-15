import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import axios from "axios";

export default function ReviewForm({ productId, userId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const reviewDTO = {
      productId: productId,
      customerId: userId,
      rating: rating,
      comment: comment,
    };

    setSubmitting(true);
    setError(null);

    try {
      await axios.post("http://localhost:8081/api/reviews", reviewDTO);

      alert("Review submitted!");
      setRating(0);
      setComment("");

      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit review. You must be a customer to comment."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!userId) {
    return (
      <Box
        sx={{
          mt: 4, mb: 2, p: 3, border: "1px solid #eee", borderRadius: 2,
          width: "90%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}
      >
        <Typography>Please log in to write a review.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4, p: 3, border: "1px solid #eee", borderRadius: 2,
        width: "90%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Write a Review</Typography>

      <Rating value={rating} onChange={(e, value) => setRating(value)} sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting || rating === 0 || comment.length < 1}
        sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
