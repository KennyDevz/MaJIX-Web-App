import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";

export default function ProductDetails({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const availableColors = useMemo(() => {
    return [...new Set(product.variants.map((v) => v.color))];
  }, [product.variants]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return [
      ...new Set(
        product.variants
          .filter(
            (v) => v.color === selectedColor && v.quantityInStock > 0
          )
          .map((v) => v.size)
      ),
    ];
  }, [product.variants, selectedColor]);

  const selectedVariant = useMemo(() => {
    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
  }, [product.variants, selectedColor, selectedSize]);


  useEffect(() => {
    if (availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors]);


  useEffect(() => {
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    } else {
      setSelectedSize(null);
    }
    setQuantity(1);
  }, [availableSizes, selectedColor]);


  const priceToDisplay = selectedVariant
    ? selectedVariant.price
    : product.variants[0].price;

  const stockAvailable = selectedVariant
    ? selectedVariant.quantityInStock
    : 0;

  const imageToDisplay = selectedVariant?.imageUrl || product.imageUrl;

  // Quantity handlers
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (selectedVariant && newQuantity > stockAvailable)
        return stockAvailable;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      console.log("Adding to cart:", {
        productId: product.productId,
        variantId: selectedVariant.variantId,
        quantity: quantity,
      });
    } else {
      alert("Please select a color and size.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap={6} mt={3}>
      <Box>
        <img
          src={imageToDisplay || "https://placehold.co/500x530"}
          alt={product.name}
          style={{
            borderRadius: 20,
            background: "#F0EEED",
            width: "500px",
            height: "530px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Right side */}
      <Box maxWidth={500}>
        <Typography variant="h4" fontWeight="700" mb={1}>
          {product.name}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="body1">4.5/5</Typography>
          <Rating name="read-only" value={4.5} precision={0.5} readOnly />
        </Stack>

        {/* Price */}
        <Stack direction="row" spacing={2} mb={2}>
          <Typography variant="h5" fontWeight="700">
            ₱{priceToDisplay.toFixed(2)}
          </Typography>
        </Stack>

        {/* Description */}
        <Typography color="rgba(0,0,0,0.6)" mb={3}>
          {product.description}
        </Typography>

        {/* Colors */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>
          Select Colors
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          {availableColors.map((color, i) => (
            <Box
              key={i}
              title={color}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: 37,
                height: 37,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid",
                borderColor:
                  selectedColor === color ? "#2b0497ff" : "transparent",
                cursor: "pointer",
                outline:
                  selectedColor === color
                    ? "2px solid #2b0497ff"
                    : "none",
                outlineOffset: 2,
                "&:hover": { border: "2px solid black" },
                boxShadow:
                  color.toUpperCase() === "#FFFFFF"
                    ? "inset 0 0 0 1px #DDD"
                    : "none",
              }}
            />
          ))}
        </Stack>

        {/* Sizes */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>
          Choose Size
          {selectedColor && availableSizes.length === 0 && (
            <span
              style={{ color: "red", marginLeft: "10px" }}
            >
              (Out of stock for {selectedColor})
            </span>
          )}
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          {availableSizes.map((size) => (
            <Button
              key={size}
              variant={
                selectedSize === size ? "contained" : "outlined"
              }
              onClick={() => setSelectedSize(size)}
              disabled={!selectedColor}
              sx={{
                borderRadius: "62px",
                borderColor:
                  selectedSize === size
                    ? "black"
                    : "rgba(0,0,0,0.3)",
                backgroundColor:
                  selectedSize === size ? "black" : "#F0F0F0",
                color:
                  selectedSize === size
                    ? "white"
                    : "rgba(0,0,0,0.6)",
                fontWeight: selectedSize === size ? 500 : 400,
                px: 3,
              }}
            >
              {size}
            </Button>
          ))}
        </Stack>

        {/* Quantity + Add to cart */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#F0F0F0",
              borderRadius: "62px",
              px: 2,
              py: 1,
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>

            <Typography mx={2}>{quantity}</Typography>

            <IconButton
              onClick={() => handleQuantityChange(1)}
              disabled={
                !selectedVariant || quantity >= stockAvailable
              }
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariant || stockAvailable === 0}
            variant="contained"
            sx={{
              borderRadius: "62px",
              px: 6,
              py: 1.5,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
              "&:disabled": { backgroundColor: "#AAA" },
            }}
          >
            {selectedVariant && stockAvailable > 0
              ? "Add to Cart"
              : stockAvailable === 0
              ? "Out of Stock"
              : "Select Options"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
