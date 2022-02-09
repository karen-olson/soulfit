import VideoCard from "./VideoCard";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { ImageList } from "@mui/material";

const MyVideosList = ({ videos, user, updateFavoriteVideos }) => {
  const userAddedVideos = videos.filter((video) => video.videoAddedByUser);

  const myAddedVideos = userAddedVideos.filter(
    (video) => video.videoAddedByUser.id === user.id
  );

  const videoCards = myAddedVideos.map((video) => (
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

export default MyVideosList;
