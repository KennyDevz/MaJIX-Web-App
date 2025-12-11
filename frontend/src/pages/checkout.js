import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import context
import BreadCrumbs from '../components/breadcrumbs';
import ContactInfoForm from '../components/checkout/ContactInfoForm';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import PaymentMethodForm from '../components/checkout/PaymentMethodForm';
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the logged-in user

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [address, setAddress] = useState({
    country: '', street: '', province: '', city: '', zipCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (user) {
      setContactInfo({
        firstName: user.firstname || '', 
        lastName: user.lastname || '',
        email: user.email || '',
        phoneNumber: user.phonenumber || '' 
      });
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?.id) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/cart/${user.id}`);
          setCartItems(response.data.cartItems || []);
          setCartTotal(response.data.totalAmount || 0);

        } catch (err) {
          console.error("Error fetching cart for checkout:", err);
        }
      };
      fetchCart();
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      alert("Please log in to place an order.");
      return;
    }

    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phoneNumber) {
      alert("Please fill in all Contact Information fields.");
      return;
    }

    if (!address.country || !address.street || !address.city || !address.province || !address.zipCode) {
      alert("Please fill in all Shipping Address fields.");
      return; // Stop here!
    }

    try {
      const payload = {
        userId: user.id,
        paymentMethod: paymentMethod,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        zipCode: address.zipCode
      };

      const response = await axios.post('http://localhost:8081/api/orders/place', payload);
      
      alert(`Order Placed Successfully! Order ID: ${response.data.orderId}`);
      console.log("Order Response:", response.data);
      navigate('/'); 

    } catch (error) {
      console.error("Checkout error:", error);

      const data = error.response?.data;
      const msg = data?.message || JSON.stringify(data);

      alert(`Order Failed: ${msg}`);
      }
  };


  return (
    <Box sx={{ mt: 2, mb: 5, px: { xs: 2, md: '80px' } }}>
      <Box sx={{ width: '100%', mb: 2 }}><BreadCrumbs page="Checkout" /></Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: '6 1 500px', minWidth: '340px' }}>
          
          {/* --- 5. PASS STATE DOWN --- */}
          <ContactInfoForm 
            contactInfo={contactInfo} 
            setContactInfo={setContactInfo} 
          />
        
          <ShippingAddressForm address={address} setAddress={setAddress} />
          <PaymentMethodForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </Box>

        <Box sx={{ flex: '4 1 350px', minWidth: '340px', position: 'sticky', top: '50px', alignSelf: 'flex-start' }}>
          <CheckoutOrderSummary cartItems={cartItems} cartTotal={cartTotal} onPlaceOrderClick={handlePlaceOrder} />
        </Box>
      </Box>
    </Box>
  );
}