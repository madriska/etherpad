#!/usr/bin/env bash

user="etherpad"
db="etherpad"

echo "Creating user ${user}..."
psql -U postgres -c "create role ${user} with login createdb;"

echo "Creating database ${db}..."
psql -U ${user} -d postgres -c "create database ${db};"

echo "Success"
