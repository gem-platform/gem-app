#! /usr/bin/env sh

# wait for DB
echo "wait for DB to be running..."
sleep 10

# Migrate
PYTHONPATH=. alembic upgrade head

# Export PORT variable for uvicorn
export PORT=${GEM_APP_PORT}
