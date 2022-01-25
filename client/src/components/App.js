import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import NavBar from "./NavBar";
import AuthPage from "./AuthPage";
import VideoCard from "./VideoCard";
import { Paper } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch("/users")
  //     .then((resp) => resp.json())
  //     .then((users) => setUsers(users));
  // }, []);

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
        <Route path="/">
          <h1>App</h1>
          <VideoCard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
