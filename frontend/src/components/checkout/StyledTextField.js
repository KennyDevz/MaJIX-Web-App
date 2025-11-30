import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

// 1. We MUST accept 'name', 'value', and 'onChange' here
export default function StyledTextField({ label, placeholder, value, onChange, name }) {
  return (
    <Box>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '16px', mb: 1, color: 'black' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        
        sx={{
          backgroundColor: '#FFFFFF', 
          '& .MuiOutlinedInput-root': {
            fontFamily: 'Poppins',
            fontSize: '14px',
            color: '#717182',
            borderRadius: '12px', 
            '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
            '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.87)' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
          },
        }}
      />
    </Box>
  );
}