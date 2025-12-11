import React from 'react';
import { Box, Typography, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

// Helper component for consistent style
const PaymentOption = ({ value, label, icon }) => (
  <Paper variant="outlined" sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
    <FormControlLabel 
      value={value} 
      control={<Radio />} 
      label={<Typography fontWeight="500">{label}</Typography>} 
      sx={{ m: 0, width: '100%' }}
    />
    {icon && <Box sx={{ ml: 'auto', color: 'text.secondary' }}>{icon}</Box>}
  </Paper>
);

export default function PaymentMethodForm({ 
  paymentMethod, 
  setPaymentMethod, 
  savedMethods = [], 
  setSelectedMethodId,
  isAddingNew = false // <--- CONTROLS THE MODE
}) {

  const handleChange = (e) => {
    const val = e.target.value;
    setPaymentMethod(val); 

    // Only relevant for Checkout: Reset ID if they chose a generic type or COD
    if (!isAddingNew && setSelectedMethodId) {
        if (val === "COD" || val === "Credit Card" || val === "GCash" || val === "PayPal") {
           setSelectedMethodId(null);
        }
    }
  };

  const handleSavedClick = (method) => {
    setPaymentMethod(method.type + " " + method.identifier);
    if (setSelectedMethodId) setSelectedMethodId(method.id);
  };

  return (
    <Paper sx={{ p: '25px', borderRadius: '20px', fontFamily: 'Poppins' }}>
      <Typography variant="h5" sx={{ fontWeight: '700', mb: 2.5 }}>
        {isAddingNew ? "Select Method Type" : "Payment Method"}
      </Typography>

      <RadioGroup name="payment-method" value={paymentMethod} onChange={handleChange}>
        
        {/* --- MODE A: CREATION (ADD NEW) --- */}
        {isAddingNew && (
            <>
                <PaymentOption value="Credit Card" label="Credit Card" />
                <PaymentOption value="GCash" label="GCash" />
                <PaymentOption value="PayPal" label="PayPal" />
            </>
        )}

        {/* --- MODE B: SELECTION (CHECKOUT) --- */}
        {!isAddingNew && (
            <>
                {/* 1. SAVED METHODS */}
                {savedMethods.map((method) => (
                    <Paper key={method.id} variant="outlined" sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box display="flex" alignItems="center">
                        <Radio 
                            checked={paymentMethod === (method.type + " " + method.identifier)}
                            onChange={() => handleSavedClick(method)}
                            value={method.type + " " + method.identifier}
                        />
                        <Box>
                            <Typography fontWeight="bold">{method.type}</Typography>
                            <Typography variant="body2">{method.identifier}</Typography>
                        </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                        Php {method.mockBalance?.toFixed(2)}
                        </Typography>
                    </Paper>
                ))}
                
                {/* 2. CASH ON DELIVERY */}
                <PaymentOption value="COD" label="Cash on Delivery" />
                
                {/* 3. Fallback message if list is empty */}
                {savedMethods.length === 0 && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary' }}>
                        No saved cards found. You can pay via COD.
                    </Typography>
                )}
            </>
        )}

      </RadioGroup>
    </Paper>
  );
}