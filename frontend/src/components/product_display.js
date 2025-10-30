
import { Grid } from '@mui/material';
import ProductCard from './product_card';
import products from "../data/sample_data.json"; 

export default function ProductDisplay(props) {
  
  return (
    <Grid container spacing={5} width='80%' >{/*Sample list only */} 
    {products.map((p, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
        <ProductCard
            image={p.image}
            title={p.title}
            name={p.name}
            price={p.price}
            rating={p.rating}
        />
        </Grid>
    ))}
    </Grid>

  );
}
