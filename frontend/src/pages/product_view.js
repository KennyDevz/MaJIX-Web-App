import { Box, Typography } from "@mui/material";
import BreadCrumbs from "../components/breadcrumbs";
import ProductDetails from "../components/product_view/product_details";
import tshirtImage from "../assets/tshirt.jpg"; 
import ProductReview from "../components/product_view/product_review";

import { useEffect } from "react";
import ReviewForm from "../components/product_view/review_form";

export default function ProductView() {
  useEffect(() => { //scrolls to the top of component
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, paddingLeft: "80px", mt: 2 }}>
      <BreadCrumbs page="Product View" />
      <ProductDetails image={tshirtImage}/>
      <Typography variant="h5" fontWeight="700" mt={4}>
        Rating & Reviews (2)
      </Typography>
      <ReviewForm productId={123} /> {/* Pass a sample productId */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: "90%"}}>
        <ProductReview
            name="John Doe"
            verified={true}
            text="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="August 14, 2023"
        />
        <ProductReview
            name="Juan Dela Cruz"
            verified={true}
            text="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="October 6, 2023"
        />
        <ProductReview
            name="Juan Dela Cruz"
            verified={true}
            text="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="October 6, 2023"
        />
        </Box>
    </Box>
  );
}
