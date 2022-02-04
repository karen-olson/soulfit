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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VideoCard = ({ video, user }) => {
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);

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

  function handleFavoriteClick(e) {
    console.log(e);
  }

  function handleEditClick(e) {
    console.log(e);
  }

  function handleDeleteClick(e) {
    console.log(e);
  }

  return (
    <>
      <ImageListItem key={video.id} sx={{ width: "15vw", height: "auto" }}>
        <Card
          sx={{
            maxWidth: 345,
            height: "38vh",
            maxHeight: 345,
            backgroundColor: "#535658",
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
              <FavoriteIcon />
            </IconButton>
            {/* WHY INFINITE LOOP??? */}
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
};

export default VideoCard;
