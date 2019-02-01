import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import registerServiceWorker from "./registerServiceWorker";

import Container from "./Container";
import PrivateRoute from "./components/PrivateRoute";
import { viewConstants as v } from "./constants";

// This order seems to matter. Better/more specific CSS rules can probably fix
// that.
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Selection from "./pages/Selection";
import Story from "./pages/Story";
import Templates from "./pages/Templates";
import WordSearch from "./pages/WordSearch";
import Task from "./pages/Task";
import Profile from "./pages/Profile";
import VolunteerAccess from "./pages/VolunteerAccess";

const customHistory = createBrowserHistory();

// This renders the main container, which is always present in the portal.
// The BrowserRouter and Switch combined display different pages based on what
// the URL in the address bar is.
// Except for `/login` and `/signup`, every route is a PrivateRoute, which means
// that a user has to be logged in to access that page. (see PrivateRoute.jsx)
ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <Container title="Portal">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/task/:taskId" component={Task} />
        <PrivateRoute path="/materials/story/:classLevel/:num" component={Story} />
        <PrivateRoute path="/materials/stories" component={Selection} componentProps={{view: v.STORIES}} />
        <PrivateRoute path="/materials/templates" component={Selection} componentProps={{view: v.TEMPLATES}}/>
        <PrivateRoute path="/materials" component={Selection} componentProps={{view: v.MATERIALS}} />
        <PrivateRoute path="/activities/wsplay/:classLevel/:num" component={WordSearch} />
        <PrivateRoute path="/activities/wordsearch" component={Selection} componentProps={{view: v.WORDSEARCH}} />
        <PrivateRoute path="/activities" component={Selection} componentProps={{view: v.ACTIVITIES}} />
        <PrivateRoute path="/profile" component={Selection} componentProps = {{view: v.PROFILE}} />
        <PrivateRoute path="/volunteer-access" component={Selection} componentProps={{view: v.VOLUNTEERACCESS}} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Container>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
