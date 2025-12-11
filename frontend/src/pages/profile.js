import React, { useContext, useState } from "react";
import { Box, Typography, Avatar, Tabs, Tab, Paper } from "@mui/material";
import { Person, ReceiptLong } from "@mui/icons-material";
import ProfileInfoForm from "../components/profile/ProfileInfoForm";
import PaymentMethod from "../components/profile/PaymentMethod";
// 1. Import the new component
import OrderHistory from "../components/profile/OrderHistory";
import { UserContext } from "../context/UserContext";

// Helper function for accessibility
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
    // 1. Main Page Wrapper (for consistent side spacing)
    <Box
      sx={{
        mt: 2,
        mb: 5,
        paddingLeft: { xs: 2, md: "80px" },
        paddingRight: { xs: 2, md: "80px" },
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 2. Profile Header (Avatar + Name) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar
          sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
          // In a real app, you'd use: src={user.avatarUrl}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "700", fontFamily: "Poppins" }}
          >
            {fullname}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontFamily: "Poppins" }}
          >
            Manage your account settings
          </Typography>
        </Box>
      </Box>

      {/* 3. Tab Bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Profile Tabs"
          sx={{
            "& .MuiTab-root": {
              fontFamily: "Poppins",
              textTransform: "none",
              fontWeight: 600,
            },
            "& .Mui-selected": { color: "black" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
          }}
        >
          <Tab
            label="Profile"
            icon={<Person />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            label="Order History"
            icon={<ReceiptLong />}
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      {/* 4. Tab Content */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Tab Panel for Profile */}
        <Box
          role="tabpanel"
          hidden={currentTab !== 0}
          id="profile-tabpanel-0"
          aria-labelledby="profile-tab-0"
        >
          {currentTab === 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "60px" }}
            >
              <ProfileInfoForm />
              <PaymentMethod />
            </div>
          )}
        </Box>

        {/* Tab Panel for Order History */}
        <Box
          role="tabpanel"
          hidden={currentTab !== 1}
          id="profile-tabpanel-1"
          aria-labelledby="profile-tab-1"
        >
          {/* 2. Use the new component here */}
          {currentTab === 1 && <OrderHistory />}
        </Box>
      </Paper>
    </Box>
  );
}
