# Kinspire Portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## 0. Setup

1. Download and install the following crucial tools for any software developer:
    1. Plaintext editor. Millions of options, from [Atom](https://atom.io), [VS Code](https://code.visualstudio.com/), and [Sublime](https://www.sublimetext.com/) to the more hardcore [Vim](https://www.vim.org/) or [Emacs](https://www.gnu.org/software/emacs/).
    2. [Git](https://git-scm.com/). The version control backbone of Github.

---

## 1. Prerequisites

The Portal is built with [NodeJS](https://nodejs.org) and [Yarn](https://yarnpkg.com/en/).

### macOS
1. Install through [Homebrew](https://brew.sh) on a terminal window.

```
$ brew install node
```

### Windows

#### Option 1: Windows Subsystem for Linux (recommended for Win10)
1. Set up WSL and Ubuntu from the Windows Store: https://docs.microsoft.com/en-us/windows/wsl/install-win10
2. Install through Advanced Packaging Tool:
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### Option 2: Git Bash
1. Set up Git on Windows: https://git-scm.com/downloads
2. Install through the website: https://nodejs.org/en/download/

---

## 2. Setup

Open a terminal window (`Terminal` or `iTerm2` on Mac, `Git Bash` or `Ubuntu on Windows`) at the root of the project, and type:

```
$ yarn
```

---

## 3. Development
To run the Kinspire Portal in your local browser for development, run:
```
$ yarn start
```

This should automatically open up http://localhost:3001 in your default browser. If not, go ahead and open it manually.

---

## 4. Deployment

### Website
To deploy the Kinspire Portal as a website, install [Firebase Tools](https://npmjs.com/package/firebase-tools), and then deploy the application:
```
$ sudo yarn global add firebase-tools
$ yarn deploy
```

Note: If you're using Git Bash, remove `sudo` from the first command.

### Desktop program
To deploy the Kinspire Portal as an Electron app, run:
```
$ yarn run electron
```
