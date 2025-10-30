import CartItem from "../components/cart_item";
import tshirtImage from "../assets/tshirt.jpg"; 
import OrderSummary from "../components/order_summary";
import BreadCrumbs from "../components/breadcrumbs";
import { Box } from "@mui/material";


export default function Cart() {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2}}>
        <Box sx={{ marginBottom: 2, display:'flex', justifyContent:'flex-start', paddingLeft:'80px'}}>
          <BreadCrumbs page='Cart'/>
        </Box>
        <Box
          sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4, padding: 2,
          }}
        >
          <CartItem name="T-shirt" size="Large" color="green" price="89.99" image={tshirtImage} />
          <OrderSummary />
        </Box>
      </Box>
    </div>
  );
}
