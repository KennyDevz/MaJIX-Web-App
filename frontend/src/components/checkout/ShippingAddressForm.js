import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import StyledTextField from './StyledTextField'; 

// 1. Accept 'address' and 'setAddress' props
export default function ShippingAddressForm({ address, setAddress }) {
  
  // 2. Create a generic handler for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
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
        Shipping Address
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledTextField 
            label="Country" 
            name="country" // 3. Add 'name' prop matching state
            value={address.country} // 4. Bind 'value'
            onChange={handleChange} // 5. Bind 'onChange'
            placeholder="e.g. Philippines" 
          />
        </Grid>
        
        <Grid item xs={12}>
          <StyledTextField 
            label="Street Address" 
            name="street" 
            value={address.street} 
            onChange={handleChange} 
            placeholder="House No., Building, Street Name" 
          />
        </Grid>

        <Grid item xs={4}>
          <StyledTextField label="Province" name="province" value={address.province} onChange={handleChange} placeholder="e.g. Cebu" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField label="City" name="city" value={address.city} onChange={handleChange} placeholder="e.g. Cebu City" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField label="Zipcode" name="zipCode" value={address.zipCode} onChange={handleChange} placeholder="e.g. 6000" />
        </Grid>
      </Grid>
    </Paper>
  );
}