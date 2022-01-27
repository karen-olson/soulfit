import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import NavBar from "./NavBar";
import AuthPage from "./AuthPage";
import VideoCard from "./VideoCard";
import CategoryList from "./CategoryList";
import { Paper } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [users, setUsers] = useState([]);

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

  function changePasswordConfirmationCase(user) {
    user["password_confirmation"] = user["passwordConfirmation"];
    delete user["passwordConfirmation"];
    return user;
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

  function onCategorySelect(id) {
    console.log("id: ", id);
    // filter videos based on current category and send the filtered videos list to VideoList
    // OR make currentCategory a state variable and have VideoList filter the videos
  }

  if (!user)
    return (
      <>
        <Paper sx={{ height: "100vh", width: "100vw" }}>
          <AuthPage onLogin={setUser} createUser={createUser} />
        </Paper>
      </>
    );

  return (
    <>
      <NavBar setUser={setUser} />
      <Switch>
        <Route path="/signup">
          <SignUpForm createUser={createUser} />
        </Route>
        <Route path="/signin">
          <LogInForm onLogin={setUser} />
        </Route>
        <Route path="/categories">
          <CategoryList
            categories={categories}
            onCategorySelect={onCategorySelect}
          />
        </Route>
        <Route path="/categories/:id/videos">
          {/* <VideoList videos={filteredVideos} /> */}
        </Route>
        <Route path="/">
          <h1>App</h1>
          <VideoCard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
