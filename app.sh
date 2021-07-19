#!/bin/sh

docker-compose -p ovasp down -v
docker volume rm ovasp_my-db
docker-compose -p ovasp up -d --force-recreate