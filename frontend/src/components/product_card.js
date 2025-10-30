import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {

    const formatted = Number(props.price).toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
    });

  return (
    <Card sx={{ width: 250}}>
        <CardActionArea component={Link} to="/Details">
      <CardMedia
        sx={{ height: 220 }}
        image={props.image}
        title={props.title}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
          {props.name}
        </Typography>
        <Box sx={{display: "flex"}}>
            <Rating name='read-only' value={props.rating} precision={.5} readOnly/>
            <Typography gutterBottom >{props.rating}/5</Typography>
        </Box>
         <Typography sx={{fontWeight: "300", fontSize: "1.5rem"}}>{formatted}</Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
