import React from 'react';
import { 
  Box, Typography, Paper, Grid, 
  Radio, RadioGroup, FormControl 
} from '@mui/material';
import StyledTextField from './StyledTextField'; 

// Helper for the radio button options 
const PaymentOption = ({ value, label }) => (
  <Box sx={{
    display: 'flex', alignItems: 'center', gap: 1.5, width: '30%', height: '48px', pl: 2, pr: 2, backgroundColor: '#ffffffff', borderRadius: '12px'
  }}>
    <Radio value={value} sx={{ p: 0, '&.Mui-checked': { color: 'black' } }} />
    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '16px', color: 'black' }}>
      {label}
    </Typography>
  </Box>
);

// 1. Accept 'paymentMethod' and 'setPaymentMethod'
export default function PaymentMethodForm({ paymentMethod, setPaymentMethod }) {

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Paper 
      elevation={0} variant="outlined"
      sx={{ 
        p: '21px 25px 25px 25px', 
        borderRadius: '20px', 
        borderColor: 'rgba(0, 0, 0, 0.10)',
        fontFamily: 'Poppins'
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', mb: 2.5 }}>
        Payment Method
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name="payment-method"
          value={paymentMethod} // 2. Bind value
          onChange={handleChange} // 3. Bind onChange
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}
        >
          <PaymentOption value="Credit Card" label="Credit Card" />
          <PaymentOption value="PayPal" label="PayPal" />
          <PaymentOption value="GCash" label="GCash" />
          <PaymentOption value="COD" label="COD" />
        </RadioGroup>
      </FormControl>
      
      {/* Only show Credit Card fields if selected */}
      {paymentMethod === 'Credit Card' && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField label="Card Number" placeholder="1234 5678 9012 3456" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField label="Expiry Date" placeholder="MM/YY" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField label="CVV" placeholder="123" />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}