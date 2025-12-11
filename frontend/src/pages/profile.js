import React, { useContext, useState } from "react";
import { Box, Typography, Avatar, Tabs, Tab, Paper } from "@mui/material";
import { Person, ReceiptLong, AssignmentReturn } from "@mui/icons-material";
import ProfileInfoForm from "../components/profile/ProfileInfoForm";
import OrderHistory from "../components/profile/OrderHistory";
import ReturnHistory from "../components/profile/ReturnHistory"; 
import { UserContext } from "../context/UserContext";
import PaymentMethod from "../components/profile/PaymentMethod";

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(UserContext);
  const fullname = `${user?.firstname} ${user?.lastname}`;
  const initials = user
    ? `${user.firstname?.charAt(0) || ""}${user.lastname?.charAt(0) || ""}`
    : "";

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 5,
        paddingLeft: { xs: 2, md: "80px" },
        paddingRight: { xs: 2, md: "80px" },
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
          {initials}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "700", fontFamily: "Poppins" }}>
            {fullname}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "Poppins" }}>
            Manage your account settings
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          sx={{
            "& .MuiTab-root": { fontFamily: "Poppins", textTransform: "none", fontWeight: 600 },
            "& .Mui-selected": { color: "black" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
          }}
        >
          <Tab label="Profile" icon={<Person />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Order History" icon={<ReceiptLong />} iconPosition="start" {...a11yProps(1)} />
          {/* --- NEW RETURN TAB --- */}
          <Tab label="Returns" icon={<AssignmentReturn />} iconPosition="start" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Content */}
      <Paper elevation={0} sx={{ borderRadius: "20px", p: { xs: 3, md: 5 } }}>
        
        {/* --- Profile Tab --- */}
        <Box role="tabpanel" hidden={currentTab !== 0}>
          {currentTab === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
              <ProfileInfoForm />
              <PaymentMethod />
            </div>
          )}
        </Box>

        {/* --- Order History Tab --- */}
        <Box role="tabpanel" hidden={currentTab !== 1}>
          {currentTab === 1 && <OrderHistory />}
        </Box>

        {/* --- RETURN HISTORY TAB --- */}
        <Box role="tabpanel" hidden={currentTab !== 2}>
          {currentTab === 2 && <ReturnHistory />}
        </Box>

      </Paper>
    </Box>
  );
}