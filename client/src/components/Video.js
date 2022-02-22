import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const Video = ({ videos }) => {
  const params = useParams();

  const video = videos.find((video) => video.id === parseInt(params.id));

  function convertDurationToMinutesAndSeconds() {
    const minutesFloat = video.duration / 60;
    const minutesInteger = parseInt(minutesFloat);
    const secondsFloat = minutesFloat - minutesInteger;
    const secondsInteger = Math.round(secondsFloat * 60);
    return { minutes: minutesInteger, seconds: secondsInteger };
  }

  const duration = convertDurationToMinutesAndSeconds();

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
            <Typography variant="body" sx={{ pb: 3 }}>
              {duration.minutes}:
              {duration.seconds < 10
                ? "0" + duration.seconds
                : duration.seconds}
            </Typography>
            <Typography pt={3} variant="h5">
              {video.title}
            </Typography>
            <Typography variant="h6">{video.channelTitle}</Typography>
            <br />
            <Typography fontSize={"medium"} sx={{ mt: -3 }}>
              {video.views.toLocaleString()} views
            </Typography>
            <Typography fontSize={"medium"} sx={{ mt: 0 }}>
              {video.likes.toLocaleString()} likes
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
