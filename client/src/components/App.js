import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import NavBar from "./NavBar";
import AuthPage from "./AuthPage";
import CategoryList from "./CategoryList";
import VideoList from "./VideoList";
import MyUploadsList from "./MyUploadsList";
import Video from "./Video";
import VideoForm from "./VideoForm";
import { Paper } from "@mui/material";
import FavoriteVideosPage from "./FavoriteVideosPage";
import renameObjectKeys from "../renameObjectKeys";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
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

  function onLogin(user) {
    setUser(user);
    history.push("/");
  }

  function createUser(newUser) {
    const newUserWithSnakeCaseKeys = renameObjectKeys(
      {
        passwordConfirmation: "password_confirmation",
      },
      newUser
    );

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserWithSnakeCaseKeys),
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

  function addVideo(video) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    };

    fetch("/videos", configObj)
      .then((resp) => resp.json())
      .then((video) => {
        const updatedVideos = [...videos, video];
        setVideos(() => updatedVideos);
        setUser({
          ...user,
          uploaded_videos: [...user.uploaded_videos, video],
        });
      });
  }

  function editVideo(editedVideo, originalVideo) {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedVideo),
    };

    fetch(`/videos/${originalVideo.id}`, configObj).then((resp) => {
      if (resp.ok) {
        resp.json().then((updatedVideo) => {
          const updatedVideos = user.uploaded_videos.map((uploaded_video) => {
            if (uploaded_video.id === updatedVideo.id) {
              return { ...updatedVideo };
            } else {
              return uploaded_video;
            }
          });
          const updatedUser = {
            ...user,
            uploaded_videos: updatedVideos,
          };
          setUser(() => updatedUser);
        });
      } else {
        console.log(resp);
        // handle errors
      }
    });
  }

  function updateFavoriteVideos(video, isFavorited) {
    let updatedFavoriteVideos = [];

    if (isFavorited) {
      updatedFavoriteVideos = user.favorited_videos.filter(
        (favorited_video) => favorited_video.id !== video.id
      );
    } else {
      updatedFavoriteVideos = [...user.favorited_videos, video];
    }

    const updatedUser = {
      ...user,
      favorited_videos: updatedFavoriteVideos,
    };

    setUser(() => updatedUser);
  }

  function deleteVideo(id) {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/videos/${id}`, configObj).then((resp) => {
      if (resp.ok) {
        // because the video lists are using user state to render
        // video cards instead of video state, you need to update
        // user state any time you want to re-render a video list
        setVideos(videos.filter((video) => video.id !== id));
        setUser({
          ...user,
          uploaded_videos: user.uploaded_videos.filter(
            (uploaded_video) => uploaded_video.id !== id
          ),
          favorited_videos: user.favorited_videos.filter(
            (favorited_video) => favorited_video.id !== id
          ),
        });
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
              deleteVideo={deleteVideo}
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
              deleteVideo={deleteVideo}
            />
          </Route>
          <Route exact path="/videos/my_uploads">
            <MyUploadsList
              videos={videos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
              deleteVideo={deleteVideo}
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
            <CategoryList categories={categories} />
          </Route>
        </Switch>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default App;
