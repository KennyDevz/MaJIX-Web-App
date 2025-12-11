import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Modal, Paper } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 
import PaymentMethodForm from "../checkout/PaymentMethodForm"; 

export default function PaymentMethod() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Data for the "Add New" form
  const [paymentData, setPaymentData] = useState({
    method: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Fetch Methods
  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:8081/api/payment-methods/user/${user.id}`)
        .then(res => setPaymentMethods(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Save New Method
  const handleSave = async () => {
    if(!user?.id) return;
    try {
      await axios.post("http://localhost:8081/api/payment-methods/add", {
        userId: user.id,
        type: paymentData.method,
        accountNumber: paymentData.cardNumber 
      });
      // Refresh list
      const res = await axios.get(`http://localhost:8081/api/payment-methods/user/${user.id}`);
      setPaymentMethods(res.data);
      setOpen(false);
    } catch (error) {
      alert("Failed to save payment method.");
    }
  };

  return (
    <>
      <Box sx={{ border: "1px solid #E5E7EB", borderRadius: "20px", p: 4, mb: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '20px' }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Payment Methods</Typography>
          <Button variant="contained" onClick={() => setOpen(true)} sx={{bgcolor: "#101828"}}>
            + New
          </Button>
        </div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* Saved Cards List */}
          {paymentMethods.length === 0 && <Typography>No saved methods yet.</Typography>}
          
          {paymentMethods.map((pm) => (
            <Paper key={pm.id} sx={{ p: 2, borderRadius: "15px", display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontWeight="bold">{pm.type}</Typography>
                <Typography color="text.secondary">{pm.identifier}</Typography>
              </Box>
              <Typography color="green" variant="caption">
                Simulated Balance: ${pm.mockBalance?.toFixed(2)}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, bgcolor: "white", borderRadius: "20px", p: 4 }}>
          <Typography variant="h6" mb={2}>Add New Payment Method</Typography>
          
          {/* --- FIX IS HERE: Enable Creation Mode --- */}
          <PaymentMethodForm 
             paymentMethod={paymentData.method} 
             setPaymentMethod={(val) => setPaymentData({...paymentData, method: val})}
             isAddingNew={true} // Shows "Credit Card", "GCash", "PayPal" options
          />
          
          {/* Simple inputs for demo */}
          <input 
            type="text" 
            placeholder="Account/Card Number" 
            style={{width: '100%', padding: '10px', marginTop: '10px'}}
            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
          />

          <Box mt={3} display="flex" gap={2}>
            <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" fullWidth onClick={handleSave} sx={{bgcolor: "#101828"}}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}