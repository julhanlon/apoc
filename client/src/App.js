import { InputBase } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENTS // CONTEXT //
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/pages/Landing";
import Profile from "./components/ProfilePage/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";


//chaning above line to the following line
import { UserProvider } from "./components/context/UserContext";

// import AuthButtons from "./components/auth/AuthButtons";
import "./App.css";

const NotFound = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <h1> 404: Invalid endpoint </h1>
  </div>
);


function App() {
  return (
    // userProvider is now wrapping all logic for handling our state, updating state, and pushing out different values to all of our children.

    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <ProtectedRoute path="/search" component={Home} />
              <ProtectedRoute path="/profile" component={Profile} />
              {/* <PublicRoute path="/" component={Landing} /> */}
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <Route path="/*" component={NotFound} />
            </Switch>
            <InputBase />
          </div>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
export default App;
