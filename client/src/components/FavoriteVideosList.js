import VideoCard from "./VideoCard";
import { Container, Box, ImageList } from "@mui/material";

const FavoriteVideosList = ({
  currentCategoryFavoriteVideos,
  user,
  updateFavoriteVideos,
  deleteVideo,
}) => {
  const videoCards = currentCategoryFavoriteVideos.map((video) => (
    <VideoCard
      video={video}
      key={video.id}
      user={user}
      updateFavoriteVideos={updateFavoriteVideos}
      deleteVideo={deleteVideo}
    />
  ));

  if (currentCategoryFavoriteVideos.length > 0 && user) {
    return (
      <Container maxWidth="xl">
        <Box
          centered
          sx={{
            width: "100vw",
            height: "100vh",
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
