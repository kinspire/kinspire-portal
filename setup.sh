#!/bin/bash

if [ ! -f ./phpdesktop-chrome-47.5-rc-php-5.4.33.zip ]; then
  wget https://github.com/cztomczak/phpdesktop/releases/download/chrome-v47.5-rc/phpdesktop-chrome-47.5-rc-php-5.4.33.zip
fi

if [ ! -d ./phpdesktop-chrome-47.5-rc-php-5.4.33/ ]; then
  unzip phpdesktop-chrome-47.5-rc-php-5.4.33.zip
  rm phpdesktop-chrome-47.5-rc-php-5.4.33.zip
fi

rm -rf phpdesktop-chrome-47.5-rc-php-5.4.33/www
mv phpdesktop-chrome-47.5-rc-php-5.4.33/* app/
rmdir phpdesktop-chrome-47.5-rc-php-5.4.33
