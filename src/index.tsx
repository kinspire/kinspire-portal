import history from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const customHistory = history.createBrowserHistory();

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
