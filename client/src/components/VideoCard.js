import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  ImageListItem,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VideoCard = ({ video, user, updateFavoriteVideos }) => {
  const myFavoriteVideoIds = user.user_saved_videos.map(
    (video) => video.video_id
  );

  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    myFavoriteVideoIds.includes(video.id)
  );

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/videos/my_videos" || user.admin === true) {
      setShowEditDeleteButtons(true);
    }
  }, []);

  function handleVideoThumbnailClick(e) {
    history.push(`/videos/${video.id}`);
  }

  function handleFavoriteClick() {
    // x create state to tell whether this video is favorited or not
    // x if the video is favorited, render a full heart. if not, render an empty heart?
    // update the database
    // x reverse isFavorited
    updateFavoriteVideos(user, video, isFavorited);
    setIsFavorited(() => !isFavorited);
  }

  function handleEditClick() {
    history.push(`/videos/${video.id}/edit`);
  }

  function handleDeleteClick(e) {
    console.log(e);
  }

  if (video && user) {
    return (
      <>
        <ImageListItem key={video.id} sx={{ width: "15vw", height: "auto" }}>
          <Card
            sx={{
              maxWidth: 345,
              height: "auto",
              maxHeight: "auto",
              backgroundColor: "#535658",
              mb: "2vh",
            }}
          >
            <CardActionArea onClick={handleVideoThumbnailClick}>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnailUrl}
                alt={`Thumbnail for ${video.title}`}
              />
              <CardHeader
                title={video.title.slice(0, 50) + "..."}
                subheader={video.channelTitle}
                titleTypographyProps={{ variant: "subtitle1", maxHeight: 80 }}
              />
              <CardContent>
                <Typography fontSize={"small"} sx={{ mt: -3 }}>
                  {video.views} views | {video.likes} likes
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ mt: -3 }}>
              <IconButton
                aria-label="add to favorites"
                size="small"
                color="primary"
                onClick={handleFavoriteClick}
              >
                {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              {showEditDeleteButtons && (
                <>
                  <IconButton
                    aria-label="edit video"
                    size="small"
                    color="secondary"
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete video"
                    size="small"
                    color="secondary"
                    onClick={handleDeleteClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </CardActions>
          </Card>
        </ImageListItem>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default VideoCard;
