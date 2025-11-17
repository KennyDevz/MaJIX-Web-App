import CartItem from "../components/cart/cart_item";
import OrderSummary from "../components/cart/order_summary";
import BreadCrumbs from "../components/breadcrumbs";
import CartLogo from "../assets/cart-logo.png"
import { Box } from "@mui/material";
import { useNavigate} from 'react-router-dom';
import { useEffect, useContext, useState  } from 'react';
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);//get Items in cart
  const [loading, setLoading] = useState(false);//UI only 
  const [error, setError] = useState(null);//UI only 

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user?.id) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/cart/${user.id}`);
        setCartItems(response.data); // response is already the list
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

  fetchCart();
  },[user])

  // Handle navigation to checkout
  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (<div style={{height: `calc(100vh - 80px)`,}}>
    {/* // Main Page Wrapper:
    // Added this Box to control the side padding to match checkout.js */}
    { !user ? ( 
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <div style={{border: '10px solid #919191ff', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px',paddingBottom: '50px',paddingLeft: '40px',paddingRight: '60px', borderRadius: '50%'}}>
          <img src={CartLogo} alt="cart-icon" style={{width: '200px', height: '200px', opacity:'.50'}}/>
        </div>
        <p style={{color: '#7b7b7bff', fontSize: '32px', marginBottom: '0'}}>Please sign in to add items to cart.</p>
        {/* <p style={{margin: '0', color: '#000000ff', fontSize: '32px', fontWeight: 'bold'}}>sign in</p> */}
      </div>
    
      ):(
        <Box 
          sx={{ 
            mt: 2, 
            mb: 5, 
            paddingLeft: { xs: 2, md: '80px' },
            paddingRight: { xs: 2, md: '80px' } 
          }}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Box sx={{ marginBottom: 2, display:'flex', justifyContent:'flex-start'}}>
            <BreadCrumbs page='Cart'/>
          </Box>
          <Box
            sx={{
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
              justifyContent: 'center', 
              gap: 4, 
              padding: 2,
              alignItems: 'flex-start' // Align items to the top
            }}
          >
            {/* This Box will contain the list of cart items */}
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              {/* You would .map() over real cart items here */}
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
                  ) : (
                    <ul>
                      {cartItems.map((item,id) => (
                        <CartItem key={id} name={item.productName} size={item.size} color={item.color} price={item.subtotal} image={item.productImage} qty={item.qty}/>
                      ))}
                    </ul>
              )}
            </Box>
            
            {/* This Box wraps the order summary */}
            <Box sx={{ flex: 1, width: '100%', maxWidth: { xs: '100%', md: '400px' }, position: 'sticky', top: '100px' }}>
              <OrderSummary 
                buttonText="Go to Checkout"
                onButtonClick={handleCheckoutClick}
              />
            </Box>
          </Box>
        </Box>
        </Box>
      )}
  </div>
  )
}

