import log from "loglevel";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-montserrat";
import "typeface-rajdhani";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./constants.css";
import "./index.css";

log.setLevel("debug");

ReactDOM.render(
  <BrowserRouter basename="/kinspire-portal">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
