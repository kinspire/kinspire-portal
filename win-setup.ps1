if (!(Test-Path "phpdesktop.zip")) {
  Invoke-WebRequest https://github.com/cztomczak/phpdesktop/releases/download/chrome-v47.5-rc/phpdesktop-chrome-47.5-rc-php-5.4.33.zip -OutFile phpdesktop.zip
}

if (!(Test-Path "phpdesktop.zip")) {
  Expand-Archive "phpdesktop.zip" -DestinationPath "phpdesktop"
  rm "phpdesktop.zip"
}

Remove-Item -path "phpdesktop/www"
Move-Item "phpdesktop/*" "app/"
Remove-Item "phpdesktop"
