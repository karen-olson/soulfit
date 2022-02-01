import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Video = ({ videos }) => {
  const params = useParams();

  const video = videos.find((video) => video.id === parseInt(params.id));

  if (video) {
    return (
      <>
        <Container maxWidth="xl">
          <Box centered sx={{ width: "80vw", height: "auto", pb: "10vh" }}>
            <ReactPlayer
              controls
              url={video.url}
              width={"80vw"}
              height={"80vh"}
            />
            <Typography pt={3} variant="h5">
              {video.title}
            </Typography>
            <Typography variant="h6">{video.channel_title}</Typography>
            <Typography>
              {video.views} views | {video.likes} likes
            </Typography>
            <br />
            <Typography variant="h6">Description</Typography>
            <Typography>{video.description}</Typography>
          </Box>
        </Container>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default Video;
