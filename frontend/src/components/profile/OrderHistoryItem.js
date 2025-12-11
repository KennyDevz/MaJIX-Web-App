import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Chip, Button, Collapse, Divider, Stepper, Step, StepLabel,
  Dialog,DialogTitle,DialogContent,DialogActions,TextField
} from '@mui/material';
import { getColorName } from '../../utils/colorUtils';
import { API_BASE_URL } from '../../apiConfig';
import { UserContext } from '../../context/UserContext';


// Helper for status colors
const getStatusChip = (status) => {
  const safeStatus = status ? status.toUpperCase() : "UNKNOWN";
  let styles = {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '12px',
    borderRadius: '8px',
    height: '24px'
  };

  switch (safeStatus) {
    case 'DELIVERED':
      return <Chip label="Delivered" sx={{ ...styles, color: '#008236', bgcolor: '#DCFCE7', border: '1px solid #B9F8CF' }} />;
    case 'SHIPPED':
    case 'IN TRANSIT':
      return <Chip label="In Transit" sx={{ ...styles, color: '#1447E6', bgcolor: '#DBEAFE', border: '1px solid #BEDBFF' }} />;
    case 'PENDING':
    case 'PROCESSING':
      return <Chip label="Processing" sx={{ ...styles, color: '#CA3500', bgcolor: '#FFEDD4', border: '1px solid #FFD6A7' }} />;
    case 'CANCELLED':
      return <Chip label="Cancelled" sx={{ ...styles, color: '#721c24', bgcolor: '#f8d7da', border: '1px solid #f5c6cb' }} />;
    default:
      return <Chip label={status} sx={{ ...styles }} />;
  }
};

export default function OrderHistoryItem({ order, onRefresh }) {
  const { orderId, status, orderDate, shippedDate, deliveredDate, items, totalAmount } = order;
  const [expanded, setExpanded] = useState(false);
  const itemCount = items ? items.length : 0;

  // --- RETURN MODAL STATE ---
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [returnForm, setReturnForm] = useState({ quantity: 1, reason: '' });
  
  // TODO: Replace with actual customer ID from context/auth
  const { user } = useContext(UserContext);
  const currentCustomerId = user ? user.id : null;

  // Calculate Subtotal
  const subtotal = items ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

  const steps = [
    { label: 'Order Placed', date: orderDate },
    { label: 'Shipped', date: shippedDate },
    { label: 'Delivered', date: deliveredDate },
  ];

  let activeStep = 0;
  if (status === 'SHIPPED') activeStep = 1; 
  if (status === 'DELIVERED') activeStep = 3; 
  if (status === 'CANCELLED') activeStep = 0; 

  // --- HANDLERS ---
  const handleCancel = async () => {
   if(!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.put(`${API_BASE_URL}/orders/${orderId}/cancel`);
      alert("Order cancelled successfully.");
      if (onRefresh) onRefresh(); 
    } catch (error) {
      alert(error.response?.data || "Failed to cancel order.");
      if (onRefresh) onRefresh();
    }
  };

  const handleOpenReturn = (item) => {
    setSelectedItem(item);
    // CHANGE: Automatically set the quantity to the full item quantity (return as whole)
    setReturnForm({ quantity: item.quantity, reason: '' });
    setOpenReturnModal(true);
  };

  const handleCloseReturn = () => {
    setOpenReturnModal(false);
    setSelectedItem(null);
  };

  const handleSubmitReturn = async () => {
    if (!currentCustomerId) {
        alert("User not authenticated. Please log in.");
        return;
    }
    if (!returnForm.reason) {
      alert("Please provide a reason.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/returns/customer/${currentCustomerId}`, {
        orderItemId: selectedItem.orderItemId,
        reason: returnForm.reason
      });
      alert("Return request submitted!");
      handleCloseReturn();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to submit return.";
      alert(errorMessage);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 3,
        bgcolor: '#F9FAFB',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* --- HEADER --- */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>
              Order #{orderId}
            </Typography>
            {getStatusChip(status)}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant="body2" sx={{ color: '#4A5565', fontFamily: 'Poppins' }}>
              {orderDate}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4A5565', fontFamily: 'Poppins' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>
            ${totalAmount?.toLocaleString()}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography 
              onClick={() => setExpanded(!expanded)}
              sx={{ color: '#4A5565', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
            >
              {expanded ? "Hide Details" : "View Details"}
            </Typography>

            {status === 'PENDING' ? (
               <Button variant="outlined" color="error" size="small" onClick={handleCancel} sx={{ fontFamily: 'Poppins', textTransform: 'none' }}>
                Cancel Order
              </Button>
            ) : (
              <Typography variant="caption" color="text.secondary">
                  {status === 'CANCELLED' ? 'Order Cancelled' : ''}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* --- EXPANDED DETAILS --- */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 1 }} />

        {/* 1. TIMELINE SECTION */}
        {status !== 'CANCELLED' && (
            <Box sx={{ width: '100%', mb: 4, mt: 1 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '14px' }}>
                                {step.label}
                            </Typography>
                            {step.date && (
                                <Typography variant="caption" sx={{ fontFamily: 'Poppins', color: '#666', display: 'block' }}>
                                    {step.date}
                                </Typography>
                            )}
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
        )}
        
        {/* 2. List of Items */}
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items && items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    
                    {/* Left: Image & Details */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {item.imageUrl && (
                            <img 
                                src={item.imageUrl} 
                                alt={item.productName} 
                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
                            />
                        )}
                        <Box>
                            <Typography variant="body2" fontWeight="600">{item.productName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                 Size: {item.size} | Color: {getColorName(item.color)} | Qty: {item.quantity}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Item Price & RETURN BUTTON */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" fontWeight="600">
                            ${(item.price * item.quantity).toLocaleString()}
                        </Typography>

                        {/* RETURN BUTTON: Only show if Delivered */}
                        {status === 'DELIVERED' && (
                            <Button 
                                size="small" 
                                variant="outlined" 
                                color="warning"
                                onClick={() => handleOpenReturn(item)}
                                sx={{ textTransform: 'none', fontSize: '12px', minWidth: 'auto', px: 2 }}
                            >
                                Return
                            </Button>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>

        {/* 3. Order Summary */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #e0e0e0', ml: 'auto', width: { xs: '100%', sm: '50%' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2">${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
                <Typography variant="body2" sx={{ color: '#008236' }}>Free</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Discount</Typography>
                <Typography variant="body2" color="text.secondary">-$0.00</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontWeight="700">Total</Typography>
                <Typography variant="body1" fontWeight="700">${totalAmount?.toLocaleString()}</Typography>
            </Box>
        </Box>

      </Collapse>

      {/* --- RETURN FORM MODAL --- */}
      <Dialog 
        open={openReturnModal} 
        onClose={handleCloseReturn} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: '18px', padding: 1 } }}
      >
        <DialogTitle 
          sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          🛍️ Return Item
        </DialogTitle>

        <DialogContent sx={{ marginTop: 1 }}>
          {selectedItem && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* PRODUCT PREVIEW CARD */}
              <Box 
                sx={{ display: 'flex', gap: 2, alignItems: 'center', padding: 1.5, borderRadius: '12px', border: '1px solid #ECECEC', backgroundColor: '#FAFAFA' }}
              >
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.productName}
                  style={{ width: 65, height: 65, objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins' }}>
                    {selectedItem.productName}
                  </Typography>
                  <Typography sx={{ fontFamily: 'Poppins', fontSize: '11px', color: '#6B7280' }}>
                    Size: {selectedItem.size} | Color: {getColorName(selectedItem.color)}
                  </Typography>
                </Box>
              </Box>

              {/* FIXED QUANTITY BOX */}
              <Box 
                sx={{ padding: 2, borderRadius: '12px', backgroundColor: '#F5F6F8', border: '1px solid #E2E8F0' }}
              >
                <Typography sx={{ color: '#6B7280', fontFamily: 'Poppins', fontSize: '12px' }}>
                  Quantity to Return
                </Typography>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, marginTop: 0.3 }}>
                  {returnForm.quantity} {returnForm.quantity === 1 ? 'item' : 'items'}
                </Typography>
              </Box>

              {/* REASON FIELD */}
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ color: '#6B7280', fontFamily: 'Poppins', fontSize: '12px' }}>
                  Reason for Return
                </Typography>

                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={returnForm.reason}
                  onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                  placeholder="Describe the issue (e.g. wrong size, damaged, not as described)..."
                  sx={{ marginTop: 0.5, '& .MuiOutlinedInput-root': { borderRadius: '12px', fontFamily: 'Poppins' } }}
                />

                <Typography sx={{ fontFamily: 'Poppins', color: '#9CA3AF', fontSize: '11px', marginTop: 0.5 }}>
                  This helps us process your return faster.
                </Typography>
              </Box>

            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
          <Button 
            onClick={handleCloseReturn} 
            color="inherit"
            sx={{ fontFamily: 'Poppins', textTransform: 'none' }}
          >
            Cancel
          </Button>

          <Button 
            onClick={handleSubmitReturn} 
            variant="contained" 
            color="primary"
            sx={{ fontFamily: 'Poppins', textTransform: 'none', borderRadius: '10px', paddingLeft: 3, paddingRight: 3 }}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>
  );
}