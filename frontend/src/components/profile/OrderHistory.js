import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import OrderHistoryItem from './OrderHistoryItem';
import { UserContext } from '../../context/UserContext'; // Ensure path is correct

export default function OrderHistory() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Orders from Backend
  const fetchOrders = async () => {
    const currentUserId = user?.userId || user?.id;

    if (!user || !currentUserId) {
        console.log("No user ID found");
        setLoading(false); // Stop loading if no user
        return;
    }

    try {
      // 3. USE THE NEW VARIABLE IN THE URL
      const response = await axios.get(`http://localhost:8081/api/orders/user/${currentUserId}`);
      
      const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 4, 
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: '700', fontFamily: 'Poppins' }}>
        Order History
      </Typography>
      
      {orders.length === 0 ? (
        <Typography variant="body1" color="text.secondary">No orders found.</Typography>
      ) : (
        <Stack spacing={3}>
          {orders.map((order) => (
            <OrderHistoryItem 
              key={order.orderId} 
              order={order} 
              onRefresh={fetchOrders} // Pass this so we can reload after cancelling
            />
          ))}
        </Stack>
      )}
    </Box>
  );

  
}