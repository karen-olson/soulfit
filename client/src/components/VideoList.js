import VideoCard from "./VideoCard";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { ImageList } from "@mui/material";
import { useParams } from "react-router-dom";

const VideoList = ({ videos, user, updateFavoriteVideos, deleteVideo }) => {
  const params = useParams();

  const videosFilteredByCategory = videos.filter(
    (video) => video.categoryId === parseInt(params.id)
  );

  const videoCards = videosFilteredByCategory.map((video) => (
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

export default VideoList;
