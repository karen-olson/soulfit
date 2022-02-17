import VideoCard from "./VideoCard";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { ImageList } from "@mui/material";

const MyUploadsList = ({ videos, user, updateFavoriteVideos, deleteVideo }) => {
  const videoCards = user.uploaded_videos.map((video) => (
    <VideoCard
      video={video}
      key={video.id}
      user={user}
      updateFavoriteVideos={updateFavoriteVideos}
      deleteVideo={deleteVideo}
    />
  ));

  if (videos.length > 0 && user) {
    return (
      <Container maxWidth="xl">
        <Box centered sx={{ width: "100vw", height: "100vh", p: "5vh" }}>
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

export default MyUploadsList;
