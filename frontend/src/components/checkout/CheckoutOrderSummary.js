import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardContent, Typography, Box, Button, Divider, Avatar } from '@mui/material';
import { getColorName } from '../../utils/colorUtils';

// 1. Updated Sub-component to include Image
const SummaryItem = ({ name, qty, price, image, size, color }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
    
    {/* Image and Details */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar 
        src={image || 'https://placehold.co/100'} 
        variant="rounded" 
        sx={{ width: 60, height: 60, bgcolor: '#f0f0f0' }} 
      />
      <Box>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px', color: 'black' }}>
          {name}
        </Typography>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '12px', color: 'rgba(0, 0, 0, 0.60)' }}>
          {getColorName(color)} / {size}
        </Typography>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '12px', color: 'rgba(0, 0, 0, 0.60)' }}>
          Qty: {qty}
        </Typography>
      </Box>
    </Box>

    {/* Price */}
    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px', color: 'black' }}>
      ₱{(price * qty).toFixed(2)}
    </Typography>
  </Box>
);

// 2. Accept 'cartItems' and 'cartTotal' props
export default function CheckoutOrderSummary({ cartItems = [], cartTotal = 0, onPlaceOrderClick }) {
  
  // Calculate totals (assuming cartTotal might not include delivery/discount yet)
  const subtotal = cartTotal; 
  const discount = 0; // Logic for discount
  const deliveryFee = 50.00; // Example fee
  const finalTotal = subtotal - discount + deliveryFee;

  return (
    <Card 
      elevation={0} 
      variant="outlined"
      sx={{ 
        width: '100%', // Let parent control width
        borderRadius: '20px', 
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins',
        p: { xs: 1, md: '20px' } 
      }}
    >
      <CardContent>
        {/* ... Header ... */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <ShoppingCartIcon sx={{ color: '#000000ff' }} />
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', ml: 1 }}>
                Order Summary
            </Typography>
        </Box>

        {/* --- 3. Map over REAL items --- */}
        <Box sx={{ mb: 2, maxHeight: '300px', overflowY: 'auto' }}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <SummaryItem 
                key={item.cartItemId} 
                name={item.productName} 
                qty={item.qty} 
                price={item.price} 
                image={item.productImage}
                size={item.size}
                color={item.color}
              />
            ))
          ) : (
            <Typography sx={{ fontStyle: 'italic', color: '#888' }}>Cart is empty</Typography>
          )}
        </Box>

        <Divider sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />

        {/* Pricing Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: 'rgba(0, 0, 0, 0.60)' }}>Subtotal</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600' }}>₱{subtotal.toFixed(2)}</Typography>
          </Box>
          {/* ... Discount ... */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', color: 'rgba(0, 0, 0, 0.60)' }}>Delivery Fee</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600' }}>₱{deliveryFee.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />

        {/* Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 3 }}>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '400' }}>Total</Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: '600' }}>₱{finalTotal.toFixed(2)}</Typography>
        </Box>

        {/* Place Order Button */}
        <Button 
          variant="contained" 
          fullWidth 
          disabled={cartItems.length === 0} // Disable if empty
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: 'white',
            height: '50px',
            borderRadius: '62px', 
            backgroundColor: 'black', 
            '&:hover': { backgroundColor: '#333' },
            textTransform: 'none',
            mt: 2
          }}
          onClick={onPlaceOrderClick}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}