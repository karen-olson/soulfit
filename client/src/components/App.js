import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import NavBar from "./NavBar";
import AuthPage from "./AuthPage";
import CategoryList from "./CategoryList";
import VideoList from "./VideoList";
import MyVideosList from "./MyVideosList";
import Video from "./Video";
import VideoForm from "./VideoForm";
import { Paper } from "@mui/material";
import FavoriteVideosPage from "./FavoriteVideosPage";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [videos, setVideos] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/categories")
      .then((resp) => resp.json())
      .then((categories) => setCategories(categories));
  }, []);

  useEffect(() => {
    fetch("/videos")
      .then((resp) => resp.json())
      .then((videos) => setVideos(videos));
  }, []);

  function changePasswordConfirmationCase(user) {
    user["password_confirmation"] = user["passwordConfirmation"];
    delete user["passwordConfirmation"];
    return user;
  }

  function onLogin(user) {
    setUser(user);
    history.push("/");
  }

  function createUser(newUser) {
    changePasswordConfirmationCase(newUser);

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    fetch("/users", configObj).then((resp) => {
      if (resp.ok) {
        resp.json().then((newUser) => {
          console.log(newUser);
          // log user in?
          // confirmation page?
        });
      }
    });
  }

  // Credit for renameObjectKeys function to https://www.30secondsofcode.org/js/s/rename-keys and https://www.banjocode.com/post/javascript/rename-keys/
  function renameObjectKeys(keysMap, obj) {
    return Object.keys(obj).reduce(
      (accumulator, key) => ({
        ...accumulator,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );
  }

  function addVideo(video) {
    const videoWithSnakeCaseKeys = renameObjectKeys(
      {
        categoryId: "category_id",
        channelTitle: "channel_title",
        youtubeVideoId: "youtube_video_id",
      },
      video
    );

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoWithSnakeCaseKeys),
    };

    fetch("/videos", configObj)
      .then((resp) => resp.json())
      .then((video) => {
        const updatedVideos = [...videos, video];
        setVideos(() => updatedVideos);
      });
  }

  function updateFavoriteVideos(video, isFavorited) {
    if (isFavorited) {
      const updatedFavoriteVideos = user.saved_videos.filter(
        (saved_video) => saved_video.id !== video.id
      );
      const userWithFavoriteVideoRemoved = {
        ...user,
        saved_videos: updatedFavoriteVideos,
      };
      setUser(() => userWithFavoriteVideoRemoved);
    } else {
      const updatedFavoriteVideos = [...user.saved_videos, video];
      const userWithFavoriteVideoAdded = {
        ...user,
        saved_videos: updatedFavoriteVideos,
      };
      setUser(() => userWithFavoriteVideoAdded);
    }
  }

  function editVideo(updatedVideoData, videoToEdit) {
    const updatedVideo = {
      ...updatedVideoData,
      createdAt: videoToEdit.createdAt,
      updatedAt: videoToEdit.updatedAt,
      publishedAt: videoToEdit.publishedAt,
      videoAddedByUser: videoToEdit.videoAddedByUser,
    };

    const updatedVideoWithSnakeCaseKeys = renameObjectKeys(
      {
        categoryId: "category_id",
        channelTitle: "channel_title",
        youtubeVideoId: "youtube_video_id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        publishedAt: "published_at",
        videoAddedByUser: "video_added_by_user",
      },
      updatedVideo
    );

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVideoWithSnakeCaseKeys),
    };

    fetch(`/videos/${videoToEdit.id}`, configObj).then((resp) => {
      if (resp.ok) {
        resp.json().then((updatedVideo) => {
          const updatedVideos = user.added_videos.map((added_video) => {
            if (added_video.id === updatedVideo.id) {
              return { ...updatedVideo };
            } else {
              return added_video;
            }
          });
          const updatedUser = {
            ...user,
            added_videos: updatedVideos,
          };
          setUser(() => updatedUser);
        });
      } else {
        console.log(resp);
        // handle errors
      }
    });
  }

  if (!user)
    return (
      <>
        <Paper sx={{ height: "100vh", width: "100vw" }}>
          <AuthPage onLogin={onLogin} createUser={createUser} />
        </Paper>
      </>
    );

  if (videos.length > 0 && user) {
    return (
      <>
        <NavBar setUser={setUser} />
        <Switch>
          <Route path="/signup">
            <SignUpForm createUser={createUser} />
          </Route>
          <Route path="/signin">
            <LogInForm onLogin={onLogin} />
          </Route>
          <Route exact path="/categories/:id/videos">
            <VideoList
              videos={videos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          </Route>
          <Route exact path="/videos/new">
            <VideoForm
              videos={videos}
              categories={categories}
              onSubmitVideo={addVideo}
            />
          </Route>
          <Route exact path="/videos/favorites">
            <FavoriteVideosPage
              categories={categories}
              videos={videos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          </Route>
          <Route exact path="/videos/my_videos">
            <MyVideosList
              videos={videos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          </Route>
          <Route exact path="/videos/:id/edit">
            <VideoForm
              videos={videos}
              categories={categories}
              onSubmitVideo={editVideo}
            />
          </Route>
          <Route exact path="/videos/:id">
            <Video videos={videos} />
          </Route>
          <Route path="/">
            <CategoryList
              categories={categories}
              onCategorySelect={setCategory}
            />
          </Route>
        </Switch>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default App;
