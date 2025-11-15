import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

/*Version 3*/
export default function ProductCard({ product }) {

  // --- 1. Get the variant to display ---
  const displayVariant = product.variants && product.variants.length > 0 
    ? product.variants[0] : {};

  // --- 2. Calculate Total Stock ---
  const totalStock = product.variants.reduce((acc, variant) => {
    return acc + (variant.quantityInStock || 0); 
  }, 0);

  // --- 3. Format Price ---
  const formattedPrice = Number(displayVariant.price).toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  // --- 4. Handle Rating (Not in backend yet) ---
  const rating = 4.5; 

  return (
    <Card sx={{ width: 250, borderRadius: '20px'}}>
      <CardActionArea component={Link} to={`/Details/${product.productId}`}>
      <CardMedia
        sx={{ height: 220 }}
        image={product.imageUrl || 'https://placehold.co/250x220'}
        title={product.name}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:"bold", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {product.name}
        </Typography>
        <Box sx={{display: "flex"}}>
            <Rating name='read-only' value={rating} precision={.5} readOnly/>
            <Typography gutterBottom >{rating}/5</Typography>
        </Box>
        <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', gap:'5px'}}>
          <Typography sx={{fontWeight: "bold", fontSize: "1.5rem"}}>{formattedPrice}</Typography>
          <Typography sx={{fontSize: '1rem', color: '#707070ff'}}>({totalStock})</Typography>
        </div>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
