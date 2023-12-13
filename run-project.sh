#!/bin/bash

# Function to handle errors
handle_error() {
  echo "Error during script execution."
  exit 1
}

trap 'handle_error' ERR

# Install npm if not installed
if ! command -v npm &> /dev/null; then
  echo "Installing npm..."
  curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y npm
fi

# Install composer if not installed
if ! command -v composer &> /dev/null; then
  echo "Installing composer..."
  curl -sS https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer
  sudo chmod +x /usr/local/bin/composer
fi

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
  echo "Installing Docker..."
  sudo apt install docker.io
fi

# Fix permissions on Frontend...
chown -R $(whoami) ./frontend

echo "Installing Frontend dependencies..."
(cd ./frontend && npm install)

echo "Installing Backend dependencies..."
(cd ./backend && composer install)

echo "Copying .env.example to .env in Frontend..."
cp ./frontend/.env.example ./frontend/.env

echo "Copying .env.example to .env in Backend..."
cp ./backend/.env.example ./backend/.env

echo "Building and starting containers with Docker Compose..."
sudo docker compose up --build -d

echo "Script completed successfully."
