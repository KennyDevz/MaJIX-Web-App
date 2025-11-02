import CartItem from "../components/cart_item";
import tshirtImage from "../assets/tshirt.jpg"; 
import OrderSummary from "../components/order_summary";
import BreadCrumbs from "../components/breadcrumbs";
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Cart() {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle navigation to checkout
  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    // Main Page Wrapper:
    // Added this Box to control the side padding to match checkout.js
    <Box 
      sx={{ 
        mt: 2, 
        mb: 5, 
        paddingLeft: { xs: 2, md: '80px' },
        paddingRight: { xs: 2, md: '80px' } 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Box sx={{ marginBottom: 2, display:'flex', justifyContent:'flex-start'}}>
          <BreadCrumbs page='Cart'/>
        </Box>
        <Box
          sx={{
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
            justifyContent: 'center', 
            gap: 4, 
            padding: 2,
            alignItems: 'flex-start' // Align items to the top
          }}
        >
          {/* This Box will contain the list of cart items */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <CartItem name="T-shirt" size="Large" color="green" price="89.99" image={tshirtImage} />
            {/* You would .map() over real cart items here */}
          </Box>
          
          {/* This Box wraps the order summary */}
          <Box sx={{ flex: 1, width: '100%', maxWidth: { xs: '100%', md: '400px' }, position: 'sticky', top: '100px' }}>
            <OrderSummary 
              buttonText="Go to Checkout"
              onButtonClick={handleCheckoutClick}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

