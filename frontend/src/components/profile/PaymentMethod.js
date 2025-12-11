import React, { useState } from "react";
import { Box, Typography, Button, Modal, Paper } from "@mui/material";
import PaymentMethodForm from "../checkout/PaymentMethodForm";

export default function PaymentMethod() {
  const [open, setOpen] = useState(false);

  // SAVED PAYMENT METHODS LIST
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, method: "Credit Card", last4: "3456" },
    { id: 2, method: "GCash", account: "09123456789" },
  ]);

  // Data updated by the form
  const [paymentData, setPaymentData] = useState({
    method: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      method: paymentData.method,
      last4:
        paymentData.method === "Credit Card"
          ? paymentData.cardNumber.slice(-4)
          : null,
      account:
        paymentData.method === "GCash" || paymentData.method === "PayPal"
          ? paymentData.cardNumber
          : null,
    };

    setPaymentMethods([...paymentMethods, newEntry]);
    setOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: "20px",
          p: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
          fontFamily: "Poppins",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Payment Methods
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#101828",
              borderRadius: "15px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { backgroundColor: "#364153" },
            }}
            onClick={() => setOpen(true)}
          >
            + New
          </Button>
        </div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {paymentMethods.map((pm) => (
            <Paper
              key={pm.id}
              sx={{
                p: 2,
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontFamily: "Poppins", fontWeight: 500 }}>
                {pm.method}
              </Typography>
              </Paper>
          ))}
        </Box>
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 800 },
            bgcolor: "white",
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
            Add Payment Method
          </Typography>

          <PaymentMethodForm
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />

          {/* BUTTONS */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "12px", textTransform: "none" }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              sx={{
                backgroundColor: "#101828",
                color: "white",
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#364153" },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
