import VideoCard from "./VideoCard";
import { Container, Box, ImageList } from "@mui/material";

const FavoriteVideosList = ({
  currentCategoryFavoriteVideos,
  user,
  updateFavoriteVideos,
}) => {
  const videoCards = currentCategoryFavoriteVideos.map((video) => (
    <VideoCard
      video={video}
      key={video.id}
      user={user}
      updateFavoriteVideos={updateFavoriteVideos}
    />
  ));

  if (currentCategoryFavoriteVideos.length > 0 && user) {
    return (
      <Container maxWidth="xl">
        <Box
          centered
          sx={{
            width: "80vw",
            height: "100vh",
            pt: "5vh",
            pr: "10vw",
            pb: "10vh",
          }}
        >
          <ImageList cols={5} gap={"auto"}>
            {videoCards}
          </ImageList>
        </Box>
      </Container>
    );
  } else {
    return <h1>No favorite videos for this category</h1>;
  }
};

export default FavoriteVideosList;
