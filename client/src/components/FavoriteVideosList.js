import VideoCard from "./VideoCard";
import { Container, Box, ImageList } from "@mui/material";

const FavoriteVideosList = ({ videos, user, updateFavoriteVideos }) => {
  const myFavoriteVideoIds = user.user_saved_videos.map(
    (video) => video.video_id
  );

  const myFavoriteVideos = myFavoriteVideoIds.map((id) =>
    videos.find((video) => video.id === id)
  );

  const videoCards = myFavoriteVideos.map((video) => (
    <VideoCard
      video={video}
      key={video.id}
      user={user}
      updateFavoriteVideos={updateFavoriteVideos}
    />
  ));

  if (videos.length > 0 && user) {
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
