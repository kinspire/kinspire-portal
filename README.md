# Kinspire Portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Prerequisites

The Portal is built with [NodeJS and NPM](https://nodejs.org).

### macOS
1. Install through [Homebrew](https://brew.sh) on a terminal window.

```
$ brew install node
```

### Windows 10+

#### Option 1: Windows Subsystem for Linux (recommended)
1. Set up WSL and Ubuntu from the Windows Store: https://docs.microsoft.com/en-us/windows/wsl/install-win10
2. Install through Advanced Packaging Tool.
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### Option 2: Git Bash
1. Set up Git on Windows: https://git-scm.com/downloads
2. Install through the website: https://nodejs.org/en/download/

## Setup

Open a terminal window (`Terminal` or `iTerm2` on Mac, `Git Bash` or `Ubuntu on Windows`) at the root of the project, and type:

```
$ npm install
```

## Development
To run the Kinspire Portal in your local browser for development, run:
```
$ npm start
```

This should automatically open up http://localhost:3001 in your default browser. If not, go ahead and open it manually.

## Deployment

### Website
To deploy the Kinspire Portal as a website, install [Firebase Tools](https://npmjs.com/package/firebase-tools), and then deploy the application:
```
$ sudo npm i firebase-tools -g
$ npm run deploy
```

Note: If you're using Git Bash, remove `sudo` from the first command.

To deploy the Kinspire Portal as an Electron app, run:
```
$ npm run electron
```
