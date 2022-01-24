import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Button } from "@mui/material";

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
        <Tab label="Home" component={NavLink} to="/" />
        <Button
          onClick={handleLogoutClick}
          variant="outlined"
          sx={{ background: "#fff" }}
        >
          Log Out
        </Button>
      </Tabs>
    </Box>
  );
};

export default NavBar;
