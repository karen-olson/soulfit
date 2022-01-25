import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Button } from "@mui/material";
import SoulFitIconWithCircle from "../SoulFitIconWithCircle.png";

const NavBar = ({ setUser }) => {
  function handleLogoutClick(e) {
    fetch("/logout", { method: "DELETE" }).then((resp) => {
      if (resp.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Box sx={{ width: "100%", mb: 4, pt: 2 }}>
      <Tabs value={false}>
        <Tab
          icon={<img src={SoulFitIconWithCircle} style={{ height: "45px" }} />}
          component={NavLink}
          to="/"
          sx={{ p: 0 }}
        />
        <Button onClick={handleLogoutClick} variant="contained">
          Log Out
        </Button>
      </Tabs>
    </Box>
  );
};

export default NavBar;
