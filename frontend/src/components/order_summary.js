import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function OrderSummary() {
  return (
    <Card sx={{ maxWidth: 400, padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <ShoppingCartIcon sx={{ color: '#000000ff' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: 1, color: 'text.primary' }}>
            Order Summary
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">₱89.99</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography variant="body1">Discount</Typography>
          <Typography variant="body1">₱50.00</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography variant="body1">Delivery Fee</Typography>
          <Typography variant="body1">₱15.00</Typography>
        </Box>

        <Box sx={{ borderBottom: '1px solid #e0e0e0', marginY: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>₱89.99</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
          <TextField
            size="small"
            label="Promo code"
            variant="outlined"
              sx={{
              flex: 1,'& .MuiOutlinedInput-root': {borderRadius: '20px',}
              }}
          />
          <Button variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333'}, borderRadius: '20px' }}>
            Apply
          </Button>
        </Box>

        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 3, paddingY: 1.5, borderRadius: '25px', backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}>
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}

