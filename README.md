# kinspire-portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Setup
1. Clone the repository.
2. If on a Windows platform, you can run the portal as a standalone application.
  - Open Powershell with Admin privileges.
  - Run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted`. If there is a confirmation prompt, press `Y` to continue.
  - Then navigate to the `kinspire-portal` directory and run `./win-setup.ps1`.
  - Run `Set-ExecutionPolicy -ExecutionPolicy Restricted` if you care about Powershell script security.
3. From the home directory run `./story.py` to prepare the story HTML files from the JSON input.

## Usage
- If on a Windows-based platform
  - Run `./win-run.sh` from Git BASH, or `./win-run.ps1` from Powershell, or just run `app/phpdesktop-chrome.exe`.
- If on a Unix-based platform (Mac/Linux)
  - Install [PHP](http://php.net) if you haven't already.
  - Spin up a PHP server in the source directory (`app/www/`).
