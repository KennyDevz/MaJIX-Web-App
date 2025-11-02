// src/components/ProductDetails.js
import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from '@mui/material/Rating';

export default function ProductDetails(props) {
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const colors = ["#4F4631", "#314F4A", "#31344F"];

  return (
    <Box display="flex" justifyContent="center" gap={6} mt={3}>
      {/* Left side: Images */}
      <Box display="flex" gap={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <img src={props.image} alt="preview" style={{ borderRadius: 20, border: "1px solid #ccc", width: "152px",height: "167px",objectFit: "cover"}} />
          <img src={props.image} alt="preview" style={{ borderRadius: 20, border: "1px solid #ccc", width: "152px",height: "167px",objectFit: "cover" }} />
          <img src={props.image} alt="preview" style={{ borderRadius: 20, border: "1px solid #ccc", width: "152px",height: "167px",objectFit: "cover" }} />
        </Box>
        <Box>
          <img
            src={props.image}
            alt="main"
            style={{ borderRadius: 20, background: "#F0EEED" , width: "444px",height: "530px",objectFit: "cover"}}
          />
        </Box>
      </Box>

      {/* Right side: Product info */}
      <Box maxWidth={500}>
        <Typography variant="h4" fontWeight="700" mb={1}>
            MaJIX T-shirt
        </Typography>

        {/* Rating + Discount */}
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="body1">4.5/5</Typography>
          <Rating name="read-only" value={4.5} precision={0.5} readOnly />
          <Box
            sx={{
              backgroundColor: "rgba(255, 51, 51, 0.10)",
              borderRadius: "62px",
              px: 2,
              py: 0.5,
            }}
          >
            <Typography color="#FF3333" fontWeight={500}>
              -40%
            </Typography>
          </Box>
        </Stack>

        {/* Price */}
        <Stack direction="row" spacing={2} mb={2}>
          <Typography variant="h5" fontWeight="700">
            ₱260
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            color="rgba(0,0,0,0.3)"
            sx={{ textDecoration: "line-through" }}
          >
            ₱300
          </Typography>
        </Stack>

        {/* Description */}
        <Typography color="rgba(0,0,0,0.6)" mb={3}>
          This t-shirt is perfect for any occasion. Crafted from a soft
          and breathable fabric, it offers superior comfort and style.
        </Typography>

        {/* Color selector */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>
          Select Colors
        </Typography>
        <Stack direction="row" spacing={2} mb={3}>
          {colors.map((color, i) => (
            <Box
              key={i}
              sx={{
                width: 37,
                height: 37,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid transparent",
                cursor: "pointer",
                "&:hover": { border: "2px solid black" },
              }}
            />
          ))}
        </Stack>

        {/* Size selector */}
        <Typography color="rgba(0,0,0,0.6)" mb={1}>
          Choose Size
        </Typography>
        <Stack direction="row" spacing={2} mb={3}>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "contained" : "outlined"}
              onClick={() => setSelectedSize(size)}
              sx={{
                borderRadius: "62px",
                borderColor: selectedSize === size ? "black" : "rgba(0,0,0,0.3)",
                backgroundColor: selectedSize === size ? "black" : "#F0F0F0",
                color: selectedSize === size ? "white" : "rgba(0,0,0,0.6)",
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
            <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography mx={2}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity((q) => q + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: "62px",
              px: 6,
              py: 1.5,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
