# Kinspire Portal

A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## 1. Setup

Install the following:

- A plaintext editor. My recommendation would be [VS Code](https://code.visualstudio.com/)
- A terminal
  - macOS
    - Terminal.app
    - iTerm2
  - Windows
    - WSL
    - Git Bash
- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org)
  - I recommend the [`n`](https://github.com/tj/n) version manager to manage Node versions on your computer.
- [Yarn 1.x](https://classic.yarnpkg.com/lang/en/)

---

## 2. Install

Clone the repository with the following command:

```
$ git clone git@github.com:kinspire/kinspire-portal
```

Open a terminal window at the root of the project, and type:

```
$ yarn
```

---

## 3. Development

To run the Kinspire Portal in your local browser for development, in a terminal window, run:

```
$ yarn start
```

Or you can run `yarn start:client` and `yarn start:desktop` in two separate terminal windows.

This should automatically open up a desktop application window. Don't close this window while working on the Portal.

---

## 4. Deployment

To deploy the Kinspire Portal as an Electron app for local testing, run:

```
$ yarn run pack
```

To repare the Kinspire Portal installer, run:

```
$ yarn run dist
```
