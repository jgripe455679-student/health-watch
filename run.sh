#! /bin/bash

cd backend
./gradlew clean build -x test
cd ..
docker compose build --build-arg JAR_FILE=build/libs/\*.jar
docker compose up