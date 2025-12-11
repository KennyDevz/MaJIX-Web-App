import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function OrderSummary({ totalAmount, buttonText, onButtonClick, disabled }) {

  const formattedPrice = Number(totalAmount).toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
    });

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
              fontFamily: 'Poppins'
            }}
          >
            Order Summary
          </Typography>
        </Box>
        

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, marginBottom: 2 }}>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '400' }}>Total Amount </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: '600' }}>{formattedPrice}</Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={disabled}
          sx={{ 
            marginTop: 1, 
            paddingY: 1.5, 
            borderRadius: '25px', 
            backgroundColor: 'black', 
            '&:hover': { backgroundColor: '#333' },
            fontFamily: 'Poppins' 
          }}
          onClick={onButtonClick}
        >
          {buttonText || 'Checkout'}
        </Button>
      </CardContent>
    </Card>
  );
}