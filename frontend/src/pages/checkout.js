import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../components/breadcrumbs';
import ContactInfoForm from '../components/checkout/ContactInfoForm';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import PaymentMethodForm from '../components/checkout/PaymentMethodForm';
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary';

export default function CheckoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = () => {
    alert('Order Placed! (Not really, but this is where the API call goes)');
  };

  return (
    // Main Page Wrapper:
    // I've removed the <Container> and am using a <Box> with padding
    // to match the style of your other pages (like cart.js).
    <Box 
      sx={{ 
        mt: 2, 
        mb: 5, 
        // Apply padding to match your other pages
        paddingLeft: { xs: 2, md: '80px' },
        paddingRight: { xs: 2, md: '80px' } // Added right padding for balance
      }}
    >
      <Box sx={{ width: '100%', mb: 2 }}>
        <BreadCrumbs page="Checkout" />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: 3 
        }}
      >
        
        {/* Left Column: Forms */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            flex: '6 1 500px', 
            minWidth: '340px', 
          }}
        >
          <ContactInfoForm />
          <ShippingAddressForm />
          <PaymentMethodForm />
        </Box>

        {/* Right Column: Order Summary */}
        <Box 
          sx={{
            flex: '4 1 350px', 
            minWidth: '340px',
            position: 'sticky', 
            top: '50px', 
            alignSelf: 'flex-start', 
          }}
        >
          <CheckoutOrderSummary 
            onPlaceOrderClick={handlePlaceOrder}
          />
        </Box>
      </Box>
    </Box>
  );
}

