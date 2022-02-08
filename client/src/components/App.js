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
  const [currentCategory, setCurrentCategory] = useState(0);
  const [videos, setVideos] = useState([]);
  // const [users, setUsers] = useState([]);

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
          // const updatedUsers = [...users, newUser];
          // setUsers(updatedUsers);
          // log user in?
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

  function updateFavoriteVideos(user, video) {
    // use renameObjectKeys to make keys snake case
    // make a patch request to user_saved_videos (returns user id and video id, or nothing for delete??)
    // update user state (how?)
  }

  function editVideo(video) {
    // const videoWithSnakeCaseKeys = renameObjectKeys(
    //   {
    //     categoryId: "category_id",
    //     channelTitle: "channel_title",
    //     youtubeVideoId: "youtube_video_id",
    //   },
    //   video
    // );
    // const configObj = {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(videoWithSnakeCaseKeys),
    // };
    // fetch("/videos", configObj)
    //   .then((resp) => resp.json())
    //   .then((video) => {
    //     const updatedVideos = [...videos, video];
    //     setVideos(() => updatedVideos);
    //   });
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
          <Route path={`/categories/:id/videos`}>
            <VideoList
              videos={videos}
              user={user}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          </Route>
          <Route path="/videos/new">
            <VideoForm
              videos={videos}
              categories={categories}
              onSubmitVideo={addVideo}
            />
          </Route>
          <Route path="/videos/favorites">
            <FavoriteVideosPage
              categories={categories}
              videos={videos}
              user={user}
              setUser={setUser}
              updateFavoriteVideos={updateFavoriteVideos}
            />
          </Route>
          <Route path="/videos/my_videos">
            <MyVideosList videos={videos} user={user} />
          </Route>
          <Route path="/videos/:id/edit">
            <VideoForm
              videos={videos}
              categories={categories}
              onSubmitVideo={editVideo}
            />
          </Route>
          <Route path="/videos/:id">
            <Video videos={videos} />
          </Route>
          <Route path="/">
            <CategoryList
              categories={categories}
              onCategorySelect={setCurrentCategory}
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
