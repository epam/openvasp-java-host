#!/usr/bin/env bash

mvn antrun:run@h2-delete liquibase:migrate@h2
