#!/bin/bash

# TODO: make into shell script
#if (!(Test-Path "phpdesktop.zip") -And !(Test-Path "phpdesktop/")) {
#  "Downloading PHPDesktop package"
#  Invoke-WebRequest https://github.com/cztomczak/phpdesktop/releases/download/chrome-v47.5-rc/phpdesktop-chrome-47.5-rc-php-5.4.33.zip -OutFile phpdesktop.zip
#} else {
#  "Package already downloaded!"
#}
#
#if (!(Test-Path "phpdesktop/")) {
#  "Extracting PHPDesktop files"
#  Expand-Archive "phpdesktop.zip" -DestinationPath "."
#  Move-Item phpdesktop-chrome-47.5-rc-php-5.4.33/ phpdesktop/
#  "Deleting arcane PHPDesktop ZIP package"
#  # rm "phpdesktop.zip"
#}
#
#if (Test-Path "phpdesktop/") {
#  "Deleting stock files from package"
#  Remove-Item -path "phpdesktop/www" -Recurse
#  Remove-Item -path "phpdesktop/settings.json"
#  "Moving important files into app folder"
#  Move-Item "phpdesktop/*" "app/"
#  "Deleting PHPDesktop folder"
#  Remove-Item "phpdesktop/"
#}
