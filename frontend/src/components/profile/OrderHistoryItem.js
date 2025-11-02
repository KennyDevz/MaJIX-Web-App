import React from 'react';
import { Box, Typography, Paper, Chip, Link } from '@mui/material';

// A helper function to get the correct color for the status chip
const getStatusChip = (status) => {
  let styles = {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '12px',
    borderRadius: '8px',
    height: '24px'
  };

  switch (status) {
    case 'Delivered':
      return <Chip label="Delivered" sx={{ ...styles, color: '#008236', bgcolor: '#DCFCE7', border: '1px solid #B9F8CF' }} />;
    case 'In Transit':
      return <Chip label="In Transit" sx={{ ...styles, color: '#1447E6', bgcolor: '#DBEAFE', border: '1px solid #BEDBFF' }} />;
    case 'Processing':
      return <Chip label="Processing" sx={{ ...styles, color: '#CA3500', bgcolor: '#FFEDD4', border: '1px solid #FFD6A7' }} />;
    default:
      return <Chip label={status} sx={{ ...styles }} />;
  }
};

export default function OrderHistoryItem({ order }) {
  const { id, status, date, itemCount, total } = order;

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 3,
        bgcolor: '#F9FAFB',
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Allow wrapping on small screens
        gap: 2,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Left Side: Order Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>
            {id}
          </Typography>
          {getStatusChip(status)}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="body2" sx={{ color: '#4A5565', fontFamily: 'Poppins' }}>
            {date}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4A5565', fontFamily: 'Poppins' }}>
            {itemCount} {itemCount > 1 ? 'items' : 'item'}
          </Typography>
        </Box>
      </Box>

      {/* Right Side: Price and Details Link */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>
          {total}
        </Typography>
        <Link 
          href="#" 
          underline="hover"
          sx={{ 
            color: '#4A5565', 
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500
          }}
          onClick={(e) => e.preventDefault()} // Prevent navigation for now
        >
          View Details
        </Link>
      </Box>
    </Paper>
  );
}
