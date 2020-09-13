# Design

## Overview

The Kinspire Portal is an Electron-powered desktop application. This document should hopefully help outline how the source code is organized and how the different pieces interact and work together.

At the top level, the source code is divided into three folders:

- `client`: source files for React
- `electron`: source files for Electron
- `common`: common Typescript files between React and Electron applications

## React <-> Electron communication

The React frontend lives in an Electron "renderer process", and communicates with the Electron main process with `ipcRenderer`/`ipcMain`. We use the `electron-better-ipc` to facilitate this passing of messages back and forth.

### Synchronous

Renderer sends requests:

```
import { ipcRenderer } from "electron-better-ipc";
const result = ipcRenderer.sendSync("message-name", argument);
```

Main responds:

```
import { ipcMain } from "electron-better-ipc";
ipcMain.on("message-name", (event, arg) => {
  event.returnValue = result;
});
```

### Asynchronous

Renderer makes requests:

```
import { ipcRenderer } from "electron-better-ipc";
const result = await ipcRenderer.callMain("message-name", argument);
```

Main responds:

```
import { ipcMain } from "electron-better-ipc";
ipcMain.answerRenderer("message-name", async (argument) => {
    ...
    return result;
});
```

Check out this guide to understand this communication API: [`ipcMain`](https://www.electronjs.org/docs/api/ipc-main)

## Development

In development, we need to run two top-level processes:

1. React development server. This allows for live changes to code to be reflected on the client. This is run with the `start:client` script and is served at port 3000 (per the configuration at `devServer` in webpack.config.js).
2. Electron development. This is a bit more complicated, but makes sense when looking at the individual scripts that are run in parallel
   1. `watch`: Typescript watcher. This watches the Typescript files and when any change is made, recompiles it into Javascript under `dist/`.
   2. `electron`: Electron desktop window process. This runs a local development version of the Electron desktop environment and runs what we have under `dist/`.

During development:

- the main Electron window serves `http://localhost:3000`, which therefore displays the React dev server.
- if changes are made to the main process (i.e. `main.ts`), we use the `electron-reload` package to reload the Electron window.

## Production

```

```
