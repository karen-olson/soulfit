import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";

const NavBar = () => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Tabs value={false}>
        <Tab label="Home" component={NavLink} to="/" />
        {/* <Tab label="New Meeting" component={NavLink} to="/meetings/new" /> */}
      </Tabs>
    </Box>
  );
};

export default NavBar;
