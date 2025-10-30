import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useState} from 'react';


export default function CartItem(props) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        setQuantity(quantity + 1);
    };
    const handleRemove = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

  return (
    <div>
      <Card sx={{ display: 'flex',width:'700px', alignItems: 'center', padding: '10px' }}>
        <CardMedia 
          component="img"
          image={props.image}
          alt={props.name}
          sx={{ width: 120, height: 120, borderRadius: 2 }}
        />
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='h6' sx={{fontStyle:'bold', fontWeight:"700",fontSize:'20px'}}>
                {props.name}
            </Typography>
            <Typography variant='subtitle1' sx={{fontStyle:'light', fontWeight:"400", fontSize:'14px'}}>
                Size = {props.size}
            </Typography>
            <Typography variant='subtitle1' sx={{fontStyle:'light', fontWeight:"400", fontSize:'14px'}}>
                Color = {props.color}
            </Typography>
            <Typography variant='subtitle1' sx={{fontStyle:'bold', fontWeight:"700",fontSize:'24px'}}>
                ₱{props.price}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '124px' }}>
            {/* Remove button at the top */}
            <Button variant="text" sx={{ textTransform: 'none', color: 'text.primary', alignSelf: 'flex-end' , marginBottom:'20px'}}>
              <IconButton size="small">
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Button>
            {/* Add/Subtract controls at the bottom */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , border:'1px', padding:'1px 8px', borderRadius:'15px', backgroundColor:'#F0F0F0'}}>
              <IconButton size="small" onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{quantity}</Typography>
              <IconButton size="small" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
}


