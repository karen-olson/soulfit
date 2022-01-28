import ReactPlayer from "react-player";
import { ImageListItem, Typography } from "@mui/material";

const VideoCard = ({ video }) => {
  console.log("video in card", video);
  return (
    <>
      <ImageListItem key={video.id}>
        <ReactPlayer
          controls
          url={video.url}
          light
          width={"30vw"}
          height={"28vh"}
        />
        <Typography>{video.title}</Typography>
        <Typography variant="h6">{video.content_creator}</Typography>
        <Typography>
          {video.views} views | {video.likes} likes
        </Typography>
      </ImageListItem>
    </>
  );
};

export default VideoCard;
