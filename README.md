# kinspire-portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Setup
* Clone the repository.
* If on a Windows platform, you can run the portal as a standalone application &ndash; but this requires some setup:
    - Open Powershell with Admin privileges.
    - Run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted`. If there is a confirmation prompt, press `Y` to continue.
    - Then navigate to the `kinspire-portal` directory and run `./win-setup.ps1`.
    - Run `Set-ExecutionPolicy -ExecutionPolicy Restricted` if you care about Powershell script security.
* From the home directory run `./story.py` to prepare the story HTML files from the JSON input.

## Usage
### Windows platform
1. Run `./win-run.sh` from Git BASH, or `./nix-run.sh` Bash on WSL, or `./win-run.ps1` from Powershell, or just run `app/phpdesktop-chrome.exe` from Windows Explorer.

### Unix-based platforms (Mac/Linux)
1. Install [PHP](http://php.net) if you haven't already.
2. Spin up a PHP server by running `./nix-run.sh` from a Terminal window.
