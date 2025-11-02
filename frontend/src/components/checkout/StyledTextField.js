import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

export default function StyledTextField({ label, placeholder }) {
  return (
    <Box>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '16px', mb: 1, color: 'black' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        sx={{
          backgroundColor: '#FFFFFF', // White background
          '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#717182',
            borderRadius: '12px', // Rounded corners
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)', // Standard outline color
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)', // Darker border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black', // Black border when focused
            },
          },
        }}
      />
    </Box>
  );
}
