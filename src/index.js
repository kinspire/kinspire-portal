import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

// This order seems to matter. Better/more specific CSS rules can probably fix
// that.
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const customHistory = createBrowserHistory();

// This renders the main container, which is always present in the portal.
// The BrowserRouter and Switch combined display different pages based on what
// the URL in the address bar is.
// Except for `/login` and `/signup`, every route is a PrivateRoute, which means
// that a user has to be logged in to access that page. (see PrivateRoute.jsx)
ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
