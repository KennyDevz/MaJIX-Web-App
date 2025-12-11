import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, CircularProgress, Paper, Chip } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { API_BASE_URL } from '../../apiConfig';

export default function ReturnHistory() {
  const { user } = useContext(UserContext);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = useCallback(async () => {
    const currentUserId = user?.id || user?.userId;
    if (!currentUserId) {
        setLoading(false);
        return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/returns/customer/${currentUserId}`);
      const sorted = response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
      setReturns(sorted);
    } catch (error) {
      console.error("Error fetching returns:", error);
    } finally {
      setLoading(false);
    }
  }, [user]); 

  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  const getStatusChip = (status) => {
    const safeStatus = status ? status.toUpperCase() : "UNKNOWN";
    let styles = { fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px', borderRadius: '8px', height: '24px' };
    switch (safeStatus) {
        case 'APPROVED': return <Chip label="Approved" sx={{ ...styles, color: '#008236', bgcolor: '#DCFCE7' }} />;
        case 'REJECTED': return <Chip label="Rejected" sx={{ ...styles, color: '#721c24', bgcolor: '#f8d7da' }} />;
        case 'PENDING': return <Chip label="Pending Review" sx={{ ...styles, color: '#CA3500', bgcolor: '#FFEDD4' }} />;
        default: return <Chip label={status} sx={{ ...styles }} />;
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant="h5" sx={{ fontWeight: '700', fontFamily: 'Poppins' }}>
        My Returns
      </Typography>
      
      {returns.length === 0 ? (
        <Typography variant="body1" color="text.secondary">No return requests found.</Typography>
      ) : (
        <Stack spacing={2}>
          {returns.map((req) => (
            <Paper 
                key={req.returnId} 
                elevation={0}
                sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    
                    {/* Left: Image and Info */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {req.imageUrl && (
                            <img 
                                src={req.imageUrl} 
                                alt={req.productName} 
                                style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
                            />
                        )}
                        <Box>
                            <Typography variant="body1" fontWeight="600" sx={{ fontFamily: 'Poppins' }}>
                                {req.productName}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                                Return ID: #{req.returnId} | Order ID: #{req.orderId}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                                Requested on: {req.requestDate}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Poppins', color: '#4B5563' }}>
                                Reason: "{req.reason}"
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Status and Quantity */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, mt: '5px' }}>
                        {getStatusChip(req.status)}
                    </Box>
                </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}