import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const NavBar = () => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs value={false}>
        <Tab label="Home" component={NavLink} to="/" />
        <Tab label="Sign Up" component={NavLink} to="/signup" />
        <Tab label="Sign In" component={NavLink} to="/signin" />
        {/* <Tab label="New Meeting" component={NavLink} to="/meetings/new" /> */}
      </Tabs>
    </Box>
  );
};

export default NavBar;
