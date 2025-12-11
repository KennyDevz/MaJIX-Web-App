import {
  Box,
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import StyledTextField from "./StyledTextField";

export default function PaymentMethodForm({ paymentData, setPaymentData }) {
  const handleMethodChange = (e) => {
    setPaymentData({ ...paymentData, method: e.target.value });
  };

  const updateField = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
  };

  const PaymentOption = ({ value, label }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        width: "30%",
        height: "48px",
        pl: 2,
        pr: 2,
        backgroundColor: "#fff",
        borderRadius: "12px",
      }}
    >
      <Radio value={value} sx={{ p: 0, "&.Mui-checked": { color: "black" } }} />
      <Typography
        sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px" }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: "21px 25px 25px 25px",
        borderRadius: "20px",
        borderColor: "rgba(0, 0, 0, 0.10)",
      }}
    >
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={paymentData.method}
          onChange={handleMethodChange}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2.5 }}
        >
          <PaymentOption value="Credit Card" label="Credit Card" />
          <PaymentOption value="PayPal" label="PayPal" />
          <PaymentOption value="GCash" label="GCash" />
        </RadioGroup>
      </FormControl>

      {paymentData.method === "Credit Card" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => updateField("cardNumber", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Expiry Date"
              placeholder="MM/YY"
              value={paymentData.expiry}
              onChange={(e) => updateField("expiry", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="CVV"
              placeholder="123"
              value={paymentData.cvv}
              onChange={(e) => updateField("cvv", e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
