#!/usr/bin/env bash

java -Dspring.profiles.active=db1,caffeine -jar target/host-0.0.2.jar --openvasp.host.configNr=1 --server.port=8080
