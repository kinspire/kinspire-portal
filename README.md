# kinspire-portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Windows Application Setup
If on a Windows platform, you can run the portal as a standalone application &ndash; but this requires some setup:

- Open Powershell with Admin privileges.
- Run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted`. If there is a confirmation prompt, press `Y` to continue.
- Then navigate to the `kinspire-portal` directory and run `./win-setup.ps1`.
- Run `Set-ExecutionPolicy -ExecutionPolicy Restricted` if you care about Powershell script security.

## Usage
### Standalone application (Windows only)
Run `./win-run.sh` from Git BASH or Bash on WSL, or `./win-run.ps1` from Powershell, or just run `app/phpdesktop-chrome.exe` from Windows Explorer.

### Browser-based (all platforms)
1. Install [PHP](http://php.net) if you haven't already.
2. Spin up a PHP server by running `./nix-run.sh` from a shell window.
3. Open the portal by navigating to [http://localhost:3000/](http://localhost:3000/) in your favorite browser
