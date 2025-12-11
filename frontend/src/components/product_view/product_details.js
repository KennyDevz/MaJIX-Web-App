import React, { useState, useEffect, useMemo, useContext } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Stack, 
  Snackbar, 
  Alert, 
  CircularProgress 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "@mui/material/Rating";
import { UserContext } from "../../context/UserContext";
import { getColorName } from '../../utils/colorUtils';
// Best Practice: Import your base URL from your config file
// import { API_BASE_URL } from '../../apiConfig'; 

export default function ProductDetails({ product }) {
  const { user } = useContext(UserContext);
  
  // Product Selection State
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // UI State for Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
  });

  // --- Derived State Logic (Same as before) ---
  const availableColors = useMemo(() => {
    return [...new Set(product.variants.map((v) => v.color))];
  }, [product.variants]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return [
      ...new Set(
        product.variants
          .filter((v) => v.color === selectedColor && v.quantityInStock > 0)
          .map((v) => v.size)
      ),
    ];
  }, [product.variants, selectedColor]);

  const selectedVariant = useMemo(() => {
    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
  }, [product.variants, selectedColor, selectedSize]);

  // --- Effects ---
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

  // --- Display Variables ---
  const priceToDisplay = selectedVariant ? selectedVariant.price : product.variants[0].price;
  const stockAvailable = selectedVariant ? selectedVariant.quantityInStock : 0;
  const imageToDisplay = selectedVariant?.imageUrl || product.imageUrl;

  // --- Handlers ---

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const showFeedback = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      // Constraint: Never allow UI to select more than actual stock
      if (selectedVariant && newQuantity > stockAvailable) return stockAvailable;
      return newQuantity;
    });
  };

  const handleAddToCart = async () => {
    // 1. Constraint: Validate Selection
    if (!selectedVariant) {
      showFeedback("Please select a color and size.", "warning");
      return;
    }

    // 2. Constraint: Validate User (though your UI hides the button, this is a safety check)
    if (!user) {
      showFeedback("You must be logged in to add items to the cart.", "error");
      return;
    }

    // 3. Constraint: Validate Stock
    if (quantity > stockAvailable) {
      showFeedback(`Only ${stockAvailable} items available.`, "error");
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      // Use the API Config variable if available, otherwise keep localhost
      // Ideally: `${API_BASE_URL}/cart/add?...`
      const response = await fetch(
        `http://localhost:8081/api/cart/add?customerId=${user.id}&variantId=${selectedVariant.variantId}&qty=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Attempt to parse backend error message
        let errorMessage = "Something went wrong";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            // If response isn't JSON, use status text
            errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      // Success
      const cart = await response.json();
      console.log("Cart updated:", cart);
      showFeedback("Item added to cart successfully!", "success");
      
    } catch (error) {
      console.error("Cart Error:", error);
      showFeedback(error.message || "Could not connect to server.", "error");
    } finally {
      setIsSubmitting(false); // Stop loading regardless of outcome
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

        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="body1">{product.averageRating || 0}/5</Typography>
          <Rating name="read-only" value={product.averageRating} precision={0.5} readOnly />
        </Stack>

        <Stack direction="row" spacing={2} mb={2}>
          <Typography variant="h5" fontWeight="700">
            ₱{priceToDisplay.toFixed(2)}
          </Typography>
        </Stack>

        <Typography color="rgba(0,0,0,0.6)" mb={3}>
          {product.description}
        </Typography>

        {/* Colors Selection */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>Select Colors</Typography>
        <Stack direction="row" spacing={2} mb={3}>
          {availableColors.map((color, i) => (
            <Box
              key={i}
              title={getColorName(color)}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: 37,
                height: 37,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid",
                borderColor: selectedColor === color ? "#2b0497ff" : "transparent",
                cursor: "pointer",
                outline: selectedColor === color ? "2px solid #2b0497ff" : "none",
                outlineOffset: 2,
                "&:hover": { border: "2px solid black" },
                boxShadow: color.toUpperCase() === "#FFFFFF" ? "inset 0 0 0 1px #DDD" : "none",
              }}
            />
          ))}
        </Stack>

        {/* Size Selection */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>
          Choose Size
          {selectedColor && availableSizes.length === 0 && (
            <span style={{ color: "red", marginLeft: "10px" }}>
              (Out of stock for {getColorName(selectedColor) || selectedColor})
            </span>
          )}
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          {availableSizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "contained" : "outlined"}
              onClick={() => setSelectedSize(size)}
              disabled={!selectedColor}
              sx={{
                borderRadius: "62px",
                borderColor: selectedSize === size ? "black" : "rgba(0,0,0,0.3)",
                backgroundColor: selectedSize === size ? "black" : "#F0F0F0",
                color: selectedSize === size ? "white" : "rgba(0,0,0,0.6)",
                fontWeight: selectedSize === size ? 500 : 400,
                px: 3,
                "&:hover": {
                    backgroundColor: selectedSize === size ? "#333" : "#E0E0E0",
                }
              }}
            >
              {size}
            </Button>
          ))}
        </Stack>

        {/* Quantity + Add to cart */}
        {user ? (
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
                disabled={quantity <= 1 || isSubmitting}
              >
                <RemoveIcon />
              </IconButton>

              <Typography mx={2}>{quantity}</Typography>

              <IconButton
                onClick={() => handleQuantityChange(1)}
                disabled={!selectedVariant || quantity >= stockAvailable || isSubmitting}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              onClick={handleAddToCart}
              // Disable button if: no variant, no stock, OR currently submitting
              disabled={!selectedVariant || stockAvailable === 0 || isSubmitting}
              variant="contained"
              sx={{
                borderRadius: "62px",
                px: 6,
                py: 1.5,
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
                "&:disabled": { backgroundColor: "#AAA" },
                minWidth: "160px" // Ensures button size doesn't jump when text changes
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : selectedVariant && stockAvailable > 0 ? (
                "Add to Cart"
              ) : stockAvailable === 0 ? (
                "Out of Stock"
              ) : (
                "Select Options"
              )}
            </Button>
          </Stack>
        ) : (
            <Typography color="error" variant="body2">
                Please log in to add items to your cart.
            </Typography>
        )}
      </Box>

      {/* Message Feedback Component */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}