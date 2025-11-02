import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import StyledTextField from './StyledTextField'; 

export default function ShippingAddressForm() {
  return (
    <Paper 
      elevation={0} 
      variant="outlined"
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
        {/* Row 1: Country */}
        <Grid item xs={12}>
          <StyledTextField label="Country" placeholder="e.g. Philippines" />
        </Grid>
        
        {/* Row 2: Street */}
        <Grid item xs={12}>
          <StyledTextField label="Street" placeholder="123 Main Street" />
        </Grid>
        
        {/* Row 3: Apt */}
        <Grid item xs={12}>
          <StyledTextField label="Apartment, suite, etc. (optional)" placeholder="Apt 4B" />
        </Grid>

        {/* Row 4: Province, City, Zipcode (Forced 3-column) */}
        <Grid item xs={4}>
          <StyledTextField label="Province" placeholder="e.g. Cebu" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField label="City" placeholder="e.g. Cebu City" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField label="Zipcode" placeholder="e.g. 6000" />
        </Grid>
      </Grid>
    </Paper>
  );
}

