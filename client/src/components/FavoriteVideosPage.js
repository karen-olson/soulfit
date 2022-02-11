import { useState } from "react";
import { Container } from "@mui/material";
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
import { bottomNavigationActionClasses, Button } from "@mui/material";

const drawerWidth = 205;

const FavoriteVideosPage = ({
  categories,
  videos,
  user,
  setUser,
  updateFavoriteVideos,
}) => {
  const [currentCategoryId, setCurrentCategoryId] = useState(
    parseInt(categories[0].id)
  );

  function handleCategoryButtonClick(e) {
    setCurrentCategoryId(parseInt(e.target.id));
  }

  const favoriteVideoIds = user.user_saved_videos.map(
    (video) => video.video_id
  );

  const favoriteVideos = favoriteVideoIds.map((id) =>
    videos.find((video) => video.id === id)
  );

  const currentCategoryFavoriteVideos = favoriteVideos.filter(
    (favoriteVideo) => favoriteVideo.categoryId === currentCategoryId
  );

  if (videos.length > 0 && categories.length > 0 && user) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: "flex" }}>
          <Box>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  // Change margin-top here to move drawer up and down (so it doesn't hide the NavBar)
                  mt: 15,
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
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
            </Drawer>
          </Box>
          {currentCategoryFavoriteVideos.length > 0 ? (
            <FavoriteVideosList
              currentCategoryFavoriteVideos={currentCategoryFavoriteVideos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          ) : (
            <Container maxWidth="xl">
              <Box height="100vh">
                <h1>Choose "Explore" to add videos.</h1>
              </Box>
            </Container>
          )}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="xl">
        <Box height="100vh">
          <h1>Loading</h1>;
        </Box>
      </Container>
    );
  }
};

export default FavoriteVideosPage;
