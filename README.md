# Kinspire Portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## 0. Setup

First, install a plaintext editor. There's hundreds of options, from [Atom](https://atom.io), [VS Code](https://code.visualstudio.com/), and [Sublime](https://www.sublimetext.com/) to the more hardcore [Vim](https://www.vim.org/) or [Emacs](https://www.gnu.org/software/emacs/).

I would also recommend installing [GitHub Desktop](https://desktop.github.com) for those not familiar with Git on the command line.

The rest of this depends on your operating system.

### macOS

1. **Terminal**: macOS comes with Terminal, so you should be all set. Some enthusiasts also like [iTerm2](https://www.iterm2.com/) instead.
2. **Homebrew**: The missing package manager for macOS, this allows you to install command-line packages effortlessly. Install from https://brew.sh.
3. **Git**: Once Homebrew is installed, run:

```
$ brew install git
```

### Windows

There are two paths for developing on Windows. Windows Subsystem for Linux is a more recent development which I **strongly** recommend. It can make life a lot easier for you down the line. The other, more easy-to-pickup option is Git Bash.

#### WSL

1. **Terminal**: Set up WSL and Ubuntu 18 from the Windows Store: https://docs.microsoft.com/en-us/windows/wsl/install-win10
2. **Git**: Install from a terminal window:

```
$ sudo apt update && sudo apt install -y git
```

#### Git Bash

1. **Terminal**: Install Git Bash: https://git-scm.com/downloads

---

## 1. Prerequisites

The Portal is built with [NodeJS](https://nodejs.org) and [Yarn](https://yarnpkg.com/en/).

### macOS
Install through [Homebrew](https://brew.sh) on a terminal window.

```
$ brew install yarn
```

This installs both Yarn and NodeJS.

### Windows

#### WSL
Install through Advanced Packaging Tool:

```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update && sudo apt-get install -y nodejs yarn
```

#### Git Bash
Install through the websites:
- https://nodejs.org/en/download/
- https://yarnpkg.com/lang/en/docs/install/

---

## 2. Setup

Open a terminal window at the root of the project, and type:

```
$ yarn
```

---

## 3. Development
To run the Kinspire Portal in your local browser for development, in the same terminal window, run:
```
$ yarn start
```

This should automatically open up http://localhost:3001 in your default browser. If not, go ahead and open it manually. **IMPORTANT**: Do not close this terminal window when developing.

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
