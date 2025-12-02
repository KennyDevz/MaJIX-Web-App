import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { getColorName } from '../../utils/colorUtils';


export default function CartItem(props) {

    const formattedPrice = Number(props.price).toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
    });

    const handleAdd = () => {
        props.incrementQty(props.id);
    };
    const handleRemove = () => {
        if (props.qty > 1) {
            props.decrementQty(props.id);
        }
    };

  return (
    <div>
      <Card sx={{ 
        display: 'flex',
        width: '100%', // Use 100% to be responsive
        maxWidth: '700px', // Set a max-width instead of fixed width
        alignItems: 'center', 
        padding: '10px' 
      }}>
        <CardMedia 
          component="img"
          image={props.image}
          alt={props.name}
          sx={{ width: 120, height: 120, borderRadius: 2 }}
        />
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography 
              variant='h6' // Use variant for sizing
              sx={{ 
                fontFamily: 'Poppins', // Add font
                fontWeight:"700" 
              }}
            >
                {props.name}
            </Typography>
            <Typography 
              variant='body2' // Use variant
              sx={{ 
                fontFamily: 'Poppins', // Add font
                fontWeight:"400", 
                color: 'text.secondary' // Use theme color
              }}
            >
                Size = {props.size}
            </Typography>
            <Typography 
              variant='body2' // Use variant
              sx={{ 
                fontFamily: 'Poppins', // Add font
                fontWeight:"400", 
                color: 'text.secondary' // Use theme color
              }}
            >
                Color = {getColorName(props.color)}
            </Typography>
            <Typography 
              variant='h5' // Use variant for price
              sx={{ 
                fontFamily: 'Poppins', // Add font
                fontWeight:"500", 
                mt: 1 // Add a little margin-top
              }}
            >
                {formattedPrice}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '124px', pr: 1 }}>
            {/* Remove button at the top */}
              <IconButton onClick={()=>{
                const confirmed = window.confirm("Remove this item from your cart?");
                  if (confirmed) {
                     props.removeCartItem(props.id)
                  }
                }} size="small" sx={{ textTransform: 'none', color: 'text.primary', alignSelf: 'flex-end' , marginBottom:'20px'}}>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            {/* Add/Subtract controls at the bottom */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , border:'1px', padding:'1px 8px', borderRadius:'15px', backgroundColor:'#F0F0F0'}}>
              <IconButton size="small" onClick={handleRemove} disabled={props.qty <= 1 || props.stock <= 0} >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
                {props.qty}
              </Typography>
              <IconButton size="small" onClick={handleAdd} disabled={props.qty >= props.stock}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
}