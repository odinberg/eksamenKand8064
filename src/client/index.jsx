import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
import { ChatApp } from "./ChatApp";

function FrontPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to="/profile">Profile page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Front page</Link>
      </header>
      <Switch>
        <Route location="/profile">
          <ProfilePage />
        </Route>
        <Route location="/login">
          <LoginPage />
        </Route>
        <Route exact location="/">
          <FrontPage />
        </Route>
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
