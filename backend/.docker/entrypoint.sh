#!/bin/bash

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan serve --host=0.0.0.0
