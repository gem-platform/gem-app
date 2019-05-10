#! /usr/bin/env sh

# wait for DB
echo "wait for DB to be running..."
sleep 10

# Mmgrate
alembic upgrade head