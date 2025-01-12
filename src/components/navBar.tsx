import React from "react";
import { Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Airbnb
        </Typography>
        <Box display="flex" gap="2rem">
          <Button component={Link} to="/users" sx={{ color: "white" }}>
            Users
          </Button>
          <Button component={Link} to="/properties" sx={{ color: "white" }}>
            Properties
          </Button>
          <Button component={Link} to="/bookings" sx={{ color: "white" }}>
            Bookings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
