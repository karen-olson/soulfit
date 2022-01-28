import VideoCard from "./VideoCard";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { ImageList } from "@mui/material";
import { useParams } from "react-router-dom";

const VideoList = ({ videos }) => {
  const params = useParams();

  const videosFilteredByCategory = videos.filter(
    (video) => video.category.id === parseInt(params.id)
  );

  const videoCards = videosFilteredByCategory.map((video) => (
    <VideoCard video={video} key={video.id} />
  ));

  return (
    <Container maxWidth="xl">
      <Box pt={4}>
        <ImageList cols={1} gap={30}>
          {videoCards}
        </ImageList>
      </Box>
    </Container>
  );
};

export default VideoList;
