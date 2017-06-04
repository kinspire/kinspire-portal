# kinspire-portal
A desktop portal for the students in Kinspire's orphanages to use to access learning materials.

## Usage
- Clone the repository.
- If on a Windows platform,
  - Open Powershell with Admin privileges.
  - Run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted`. If there is a confirmation prompt, press `Y` to continue.
  - Then navigate to the `kinspire-portal` directory and run `./win-setup.ps1`.
  - Run `Set-ExecutionPolicy -ExecutionPolicy Restricted`.
- If on a Unix-based platform (Mac/Linux)
  - Install [PHP](http://php.net) if you haven't already.
  - Spin up a PHP server in the source directory (`app/www/`).
