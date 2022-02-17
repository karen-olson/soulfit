import { useState } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FavoriteVideosList from "./FavoriteVideosList";
import { Button } from "@mui/material";

const drawerWidth = 205;

const FavoriteVideosPage = ({
  categories,
  videos,
  user,
  updateFavoriteVideos,
}) => {
  const [currentCategoryId, setCurrentCategoryId] = useState(
    parseInt(categories[0].id)
  );

  function handleCategoryButtonClick(e) {
    setCurrentCategoryId(parseInt(e.target.id));
  }

  const currentCategoryFavoriteVideos = user.favorited_videos.filter(
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
