import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import NavBar from "./NavBar";
import LogInForm from "./LogInForm";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((resp) => resp.json())
      .then((users) => setUsers(users));
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
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          // log user in?
        });
      }
    });
  }
  console.log(users);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/signup">
            <SignUpForm createUser={createUser} />
          </Route>
          <Route path="/signin">
            <LogInForm />
          </Route>
          <Route path="/">
            <h1>App</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Create a SignUpForm component
// Make a static form that accepts name, username, password, and password confirmation
// Add state (formData in form, users in App)
// Add inverse data flow (send formData up to App)
// In App, send new user data to backend & update users state
