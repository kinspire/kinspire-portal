import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "typeface-montserrat";
import "typeface-rajdhani";
import App from "./App";
import AppTheme from "./AppTheme";
import "./constants.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

console.log("hi");

// TODO set basename from env var
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/build">
      <AppTheme>
        <App />
      </AppTheme>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
