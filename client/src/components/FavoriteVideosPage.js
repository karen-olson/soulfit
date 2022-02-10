import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NavBar from "./NavBar";
import FavoriteVideosList from "./FavoriteVideosList";
import { Button } from "@mui/material";

const drawerWidth = 240;

const FavoriteVideosPage = ({
  categories,
  videos,
  user,
  setUser,
  updateFavoriteVideos,
}) => {
  const [currentCategoryId, setCurrentCategoryId] = useState(categories[0].id);

  function handleCategoryButtonClick(e) {
    setCurrentCategoryId(e.target.id);
  }

  if (videos.length > 0 && categories.length > 0 && user) {
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <NavBar setUser={setUser} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", mt: 10 }}>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <Button
                    onClick={handleCategoryButtonClick}
                    id={category.id}
                    variant="text"
                    color="secondary"
                  >
                    {category.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <FavoriteVideosList
            videos={videos}
            user={user}
            currentCategoryId={currentCategoryId}
            updateFavoriteVideos={updateFavoriteVideos}
          />
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default FavoriteVideosPage;
