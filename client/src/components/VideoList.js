import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
  const videoCards = videos.map((video) => {
    <VideoCard video={video} key={video.id} />;
  });
  return (
    <Container>
      <Box>
        <ImageList>{videoCards}</ImageList>
      </Box>
    </Container>
  );
};

export default VideoList;
