import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid 
} from '@mui/material';

// Custom styled TextField to match your Figma design
const StyledTextField = (props) => (
  <TextField
    variant="filled"
    fullWidth
    InputProps={{ 
      disableUnderline: true, 
      sx: { 
        borderRadius: '15px', 
        backgroundColor: '#F3F4F6',
        '&:hover': {
            backgroundColor: '#E5E7EB',
        },
        '&.Mui-focused': {
            backgroundColor: '#E5E7EB',
        },
      } 
    }}
    InputLabelProps={{
      sx: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        color: '#364153'
      }
    }}
    sx={{
      '& .MuiFilledInput-root': {
        borderRadius: '15px',
      },
      '& .MuiInputLabel-root': {
        fontFamily: 'Poppins',
      },
      '& .MuiInputBase-input': {
        fontFamily: 'Poppins',
        color: '#717182'
      }
    }}
    {...props}
  />
);

export default function ProfileInfoForm() {
  return (
    <Box 
      component="form" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 4, 
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: '700', fontFamily: 'Poppins' }}>
        Profile Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField 
            label="Full Name" 
            defaultValue="John Doe" 
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField 
            label="Email Address" 
            defaultValue="john.doe@example.com" 
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField 
            label="Phone Number" 
            defaultValue="+1 (555) 000-0000" 
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField 
            label="Address" 
            defaultValue="123 Main Street, New York, NY 10001" 
          />
        </Grid>
      </Grid>
      
      {/* Save / Logout Buttons */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap', // Wrap buttons on small screens
          gap: 2,
          mt: 4 
        }}
      >
        <Button 
          variant="outlined" 
          sx={{
            color: '#E7000B',
            borderColor: '#FFC9C9',
            backgroundColor: '#FEF2F2',
            borderRadius: '15px',
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: 600,
            padding: '10px 32px',
            '&:hover': {
              backgroundColor: '#FEEBEB',
              borderColor: '#E7000B',
            }
          }}
        >
          Logout
        </Button>
        <Button 
          variant="contained"
          sx={{
            color: 'white',
            backgroundColor: '#101828',
            borderRadius: '15px',
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: 600,
            padding: '10px 32px',
            '&:hover': {
              backgroundColor: '#364153',
            }
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
