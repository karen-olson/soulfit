import VideoCard from "./VideoCard";
import { Container, Box, ImageList } from "@mui/material";

const FavoriteVideosList = ({
  videos,
  user,
  currentCategoryId,
  updateFavoriteVideos,
}) => {
  const favoriteVideoIds = user.user_saved_videos.map(
    (video) => video.video_id
  );

  const favoriteVideos = favoriteVideoIds.map((id) =>
    videos.find((video) => video.id === id)
  );

  const favoriteVideosByCategory = favoriteVideos.filter(
    (video) => video.categoryId === currentCategoryId
  );

  const videoCards = favoriteVideosByCategory.map((video) => (
    <VideoCard
      video={video}
      key={video.id}
      user={user}
      updateFavoriteVideos={updateFavoriteVideos}
    />
  ));

  if (videos.length > 0 && currentCategoryId && user) {
    return (
      <Container maxWidth="xl">
        <Box
          centered
          sx={{ width: "80vw", height: "100vh", pt: "5vh", pb: "10vh" }}
        >
          <ImageList cols={5} gap={"auto"}>
            {videoCards}
          </ImageList>
        </Box>
      </Container>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default FavoriteVideosList;
