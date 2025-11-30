import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import StyledTextField from './StyledTextField'; 

// 1. Accept the props from the parent
export default function ContactInfoForm({ contactInfo, setContactInfo }) {

  // 2. Handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: '25px', borderRadius: '20px', borderColor: 'rgba(0, 0, 0, 0.10)', fontFamily: 'Poppins' }}>
      <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', mb: 2.5 }}>
        Contact Information
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledTextField 
            label="First Name" 
            placeholder="John" 
            name="firstName"
            // 3. CONNECT THE VALUE
            value={contactInfo.firstName} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField 
            label="Last Name" 
            placeholder="Doe" 
            name="lastName"
            value={contactInfo.lastName}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={6}>
          <StyledTextField 
            label="Email" 
            placeholder="email@example.com" 
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField 
            label="Phone Number" 
            placeholder="+63 900 000 0000" 
            name="phoneNumber"
            value={contactInfo.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}