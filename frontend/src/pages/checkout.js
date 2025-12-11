import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import BreadCrumbs from '../components/breadcrumbs';
import ContactInfoForm from '../components/checkout/ContactInfoForm';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import PaymentMethodForm from '../components/checkout/PaymentMethodForm';
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [savedMethods, setSavedMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null); 

  const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [address, setAddress] = useState({ country: '', street: '', province: '', city: '', zipCode: '' });

  useEffect(() => {
    if (user) {
      setContactInfo({ firstName: user.firstname || '', lastName: user.lastname || '', email: user.email || '', phoneNumber: user.phonenumber || '' });
      
      // 1. Fetch Cart
      axios.get(`http://localhost:8081/api/cart/${user.id}`)
        .then(res => {
           setCartItems(res.data.cartItems || []);
           setCartTotal(res.data.totalAmount || 0);
        }).catch(err => console.error(err));

      // 2. Fetch Saved Methods
      axios.get(`http://localhost:8081/api/payment-methods/user/${user.id}`)
        .then(res => setSavedMethods(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!user?.id) { alert("Please log in."); return; }

    // 2. --- RESTORE THIS VALIDATION BLOCK ---
    if (!address.street || !address.city || !address.province || !address.country || !address.zipCode) {
        alert("Please fill in all Shipping Address fields.");
        return; 
    }

    try {
      const payload = {
        userId: user.id,
        paymentMethod: paymentMethod, 
        savedPaymentMethodId: selectedMethodId, // ID (null if COD)
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        zipCode: address.zipCode
      };

      const response = await axios.post('http://localhost:8081/api/orders/place', payload);
      alert(`Success! Order ID: ${response.data.orderId}`);
      navigate('/'); 

    } catch (error) {
      const msg = error.response?.data?.message || "Transaction Failed";
      alert(`Order Failed: ${msg}`);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 5, px: { xs: 2, md: '80px' } }}>
      <Box sx={{ width: '100%', mb: 2 }}><BreadCrumbs page="Checkout" /></Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: '6 1 500px', minWidth: '340px' }}>
          <ContactInfoForm contactInfo={contactInfo} setContactInfo={setContactInfo} />
          <ShippingAddressForm address={address} setAddress={setAddress} />
          
          {/* PASSING SAVED METHODS + SELECTION MODE */}
          <PaymentMethodForm 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod}
            savedMethods={savedMethods}
            setSelectedMethodId={setSelectedMethodId}
            isAddingNew={false} // Explicitly strictly selection mode
          />
        </Box>

        <Box sx={{ flex: '4 1 350px', minWidth: '340px' }}>
          <CheckoutOrderSummary cartItems={cartItems} cartTotal={cartTotal} onPlaceOrderClick={handlePlaceOrder} />
        </Box>
      </Box>
    </Box>
  );
}