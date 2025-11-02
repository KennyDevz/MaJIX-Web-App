import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import StyledTextField from './StyledTextField'; 

export default function ContactInfoForm() {
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
        Contact Information
      </Typography>
      
      <Grid container spacing={2}>
        {/* Row 1: First Name and Last Name (Forced 2-column) */}
        <Grid item xs={6}>
          <StyledTextField label="First Name" placeholder="John" />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField label="Last Name" placeholder="Doe" />
        </Grid>
        
        {/* Row 2: Email and Phone Number (Forced 2-column) */}
        <Grid item xs={6}>
          <StyledTextField label="Email" placeholder="your.email@example.com" />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField label="Phone Number" placeholder="+63 900 000 0000" />
        </Grid>
      </Grid>
    </Paper>
  );
}

