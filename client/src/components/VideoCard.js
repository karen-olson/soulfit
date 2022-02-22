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

const VideoCard = ({ video, user, updateFavoriteVideos, deleteVideo }) => {
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);

  // Since video objects are stored in state in multiple places (videos, user.favorited_videos, user.uploaded_videos),
  //    and because .includes doesn't consider copies of objects to be equal, a custom search method is needed.
  //    Video objects stored in videos state have an extra key (videoUploadedByUser), so this needs to be added
  //    to video objects stored in user state in order to determine if they have equal values.
  //    (It was easier to add a value to an object than to remove one.)
  function favoritedStatus() {
    const findFavorite = user.favorited_videos.find((favorited_video) => {
      const favoritedVideoWithVideoUploadedByUser = {
        ...favorited_video,
        videoUploadedByUser: video.videoUploadedByUser,
      };
      return (
        JSON.stringify(favoritedVideoWithVideoUploadedByUser) ===
        JSON.stringify(video)
      );
    });

    if (findFavorite === undefined) {
      return false;
    } else {
      return true;
    }
  }
  const favorited = favoritedStatus();

  const [isFavorited, setIsFavorited] = useState(favorited);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/videos/my_uploads" || user.admin === true) {
      setShowEditDeleteButtons(true);
    }
  }, []);

  function handleVideoThumbnailClick(e) {
    history.push(`/videos/${video.id}`);
  }

  function handleFavoriteClick() {
    if (isFavorited) {
      unfavoriteVideo(video);
    } else {
      favoriteVideo(user, video);
    }
  }

  function unfavoriteVideo(video) {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        video_id: video.id,
      }),
    };

    // Using a custom route where no ID is appended to the URL on a delete request.
    // This is to avoid having to store all of user_favorited_videos in state on the frontend.
    // In order to delete the correct record, send a delete request to /user_favorited_videos,
    //    and include the user_id and video_id in the body of the request.
    fetch(`/user_favorited_videos/`, configObj).then((resp) => {
      if (resp.ok) {
        updateFavoriteVideos(video, isFavorited);
        setIsFavorited(false);
      }
    });
  }

  function favoriteVideo(user, video) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        video_id: video.id,
      }),
    };

    fetch(`/user_favorited_videos`, configObj)
      .then((resp) => resp.json())
      .then((userFavoritedVideo) => {
        updateFavoriteVideos(video, isFavorited);
        setIsFavorited(true);
      });
  }

  function handleEditClick() {
    history.push(`/videos/${video.id}/edit`);
  }

  function handleDeleteClick(e) {
    deleteVideo(video.id);
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
