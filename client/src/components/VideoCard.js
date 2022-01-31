import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { ImageListItem, Typography } from "@mui/material";

const VideoCard = ({ video }) => {
  const history = useHistory();

  function handleVideoThumbnailClick(e) {
    history.push(`/videos/${video.id}`);
  }

  return (
    <>
      <ImageListItem key={video.id} sx={{ width: "15vw", height: "auto" }}>
        <img src={video.thumbnail_url} onClick={handleVideoThumbnailClick} />
        <Typography fontSize={"small"}>{video.title}</Typography>
        <Typography>{video.channel_title}</Typography>
        <Typography fontSize={"small"}>
          {video.views} views | {video.likes} likes
        </Typography>
      </ImageListItem>
    </>
  );
};

export default VideoCard;
