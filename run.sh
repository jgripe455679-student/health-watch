#! /bin/bash

cd backend
./gradlew clean build
cd ..
docker compose build
docker compose up