import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-montserrat";
import "typeface-rajdhani";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./constants.css";
import "./index.css";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={customHistory}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
