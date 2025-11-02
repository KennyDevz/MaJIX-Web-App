import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// 1. Accept the new props: buttonText and onButtonClick
export default function OrderSummary({ buttonText, onButtonClick }) {
  return (
    <Card sx={{ maxWidth: 400, padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <ShoppingCartIcon sx={{ color: '#000000ff' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              marginLeft: 1, 
              color: 'text.primary', 
              fontFamily: 'Poppins' // Added font
            }}
          >
            Order Summary
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)'  }}>Subtotal</Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '500' }}>₱89.99</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)'  }}>Discount</Typography>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '500' }}>₱50.00</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'rgba(0, 0, 0, 0.60)'  }}>Delivery Fee</Typography>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '500'}}>₱15.00</Typography>
        </Box>

        <Box sx={{ borderBottom: '1px solid #e0e0e0', marginY: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Typography  sx={{fontFamily: 'Poppins', fontSize: '20px', fontWeight: '400' }}>Total</Typography>
          <Typography  sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: '600' }}>₱89.99</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
          <TextField
            size="small"
            label="Promo code"
            variant="outlined"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                fontFamily: 'Poppins'
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins'
              }
            }}
          />
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: 'black', 
              '&:hover': { backgroundColor: '#333'}, 
              borderRadius: '20px',
              fontFamily: 'Poppins' 
            }}
          >
            Apply
          </Button>
        </Box>

        {/* 2. Use the new props for the button */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ 
            marginTop: 3, 
            paddingY: 1.5, 
            borderRadius: '25px', 
            backgroundColor: 'black', 
            '&:hover': { backgroundColor: '#333' },
            fontFamily: 'Poppins' 
          }}
          onClick={onButtonClick} // 3. Use the onClick prop
        >
          {buttonText || 'Checkout'} {/* 4. Use the buttonText prop, with a default */}
        </Button>
      </CardContent>
    </Card>
  );
}

