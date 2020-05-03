import log from "loglevel";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AllElectron } from "electron";
import "typeface-montserrat";
import "typeface-rajdhani";
import App from "./App";
import AppTheme from "./AppTheme";
import * as serviceWorker from "./serviceWorker";
import "./constants.css";
import "./index.css";
import { Messages } from "@common/messages";

log.setLevel("debug");

log.debug("hi");

// TODO set basename from env var
ReactDOM.render(
  <BrowserRouter basename="/build">
    <AppTheme>
      <App />
    </AppTheme>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

const electron: AllElectron = window.require("electron");

electron.ipcRenderer.on(Messages.Ping.REPLY, (_event, arg) => {
  console.log(arg);
});
electron.ipcRenderer.send(Messages.Ping.REQUEST, "ping");
