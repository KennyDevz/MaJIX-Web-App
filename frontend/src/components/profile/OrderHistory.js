import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import OrderHistoryItem from './OrderHistoryItem'; // We'll create this next

// Sample data to match your Figma design
const orders = [
  {
    id: 'ORD-2024-001',
    status: 'Delivered',
    date: 'October 25, 2024',
    itemCount: 3,
    total: '$89.99'
  },
  {
    id: 'ORD-2024-002',
    status: 'In Transit',
    date: 'October 20, 2024',
    itemCount: 2,
    total: '$149.99'
  },
  {
    id: 'ORD-2024-003',
    status: 'Delivered',
    date: 'October 15, 2024',
    itemCount: 1,
    total: '$59.99'
  },
  {
    id: 'ORD-2024-004',
    status: 'Processing',
    date: 'October 10, 2024',
    itemCount: 4,
    total: '$199.99'
  },
];

export default function OrderHistory() {
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
      
      <Stack spacing={3}>
        {/* We will map over the real order data here later */}
        {orders.map((order) => (
          <OrderHistoryItem key={order.id} order={order} />
        ))}
      </Stack>
    </Box>
  );
}
