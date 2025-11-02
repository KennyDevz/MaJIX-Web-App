import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardContent, Typography, Box, Button, Divider } from '@mui/material';

// A new sub-component for the items in the summary
const SummaryItem = ({ name, qty, price }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
    <Box>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '16px', color: 'black' }}>
        {name}
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.60)' }}>
        Qty: {qty}
      </Typography>
    </Box>
    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '16px', color: 'black' }}>
      ${price.toFixed(2)}
    </Typography>
  </Box>
);

const items = [
  { name: 'Gradient Graphic T-shirt', qty: 1, price: 145.00 },
  { name: 'Checkered Shirt', qty: 1, price: 180.00 },
  { name: 'Skinny Fit Jeans', qty: 1, price: 240.00 },
];

export default function CheckoutOrderSummary({ onPlaceOrderClick }) {
  // Calculate totals from the hard-coded items
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal * 0.20; // 20% discount
  const deliveryFee = 15.00;
  const total = subtotal - discount + deliveryFee;

  return (
    <Card 
      elevation={0} 
      variant="outlined"
      sx={{ 
        width: '90%', 
        borderRadius: '20px', 
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins',
        p: { xs: 1, md: '21px 25px 1px 25px' } 
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <ShoppingCartIcon sx={{ color: '#000000ff' }} />
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', ml: 1 }}>
                Order Summary
            </Typography>
        </Box>
        

        {/* Item List */}
        <Box sx={{ mb: 2 }}>
          {items.map((item) => (
            <SummaryItem key={item.name} {...item} />
          ))}
        </Box>

        <Divider sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />

        {/* Pricing Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)' }}>Subtotal</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '600' }}>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)' }}>Discount (-20%)</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '600', color: '#FF3333' }}>-${discount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)' }}>Delivery Fee</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '600' }}>${deliveryFee.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />

        {/* Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 3 }}>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '400' }}>Total</Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: '600' }}>${total.toFixed(2)}</Typography>
        </Box>

        {/* Place Order Button */}
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: 'white',
            height: '60px',
            borderRadius: '62px', 
            backgroundColor: 'black', 
            '&:hover': { backgroundColor: '#333' },
            textTransform: 'none',
            mt: 3
          }}
          onClick={onPlaceOrderClick}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}

