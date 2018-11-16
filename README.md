# Kinspire Portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Prerequisites
Install the following on your computer before starting work on the Portal:

- [npm/nodejs](http://nodejs.org)

Note that if you want to use the Windows Subsystem for Linux (i.e. Linux on Windows), which is the preferred method for Windows, install npm with the following command:

```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

## Setup

Open a terminal window (`Terminal` or `iTerm2` on Mac, `Git Bash` or `Linux on Windows` on Windows) at root of the project, and type:

```
$ npm install
```

## Development
To run the Kinspire Portal in your local browser for development, run:
```
$ npm start
```

This should automatically open up http://localhost:3001 in your default browser. If not, go ahead and open it manually.

## Release
To package the Kinspire Portal as an Electron app, run:
```
$ npm run electron
```
