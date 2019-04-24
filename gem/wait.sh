#!/bin/bash
# waitForContainerSetup.sh
set -e

# Max query attempts before consider setup failed
MAX_TRIES=50

# Return true-like values if and only if logs
# contain the expected "ready" line
function clientIsReady() {
  docker-compose logs gem-client
  echo "--------------------------"
  docker-compose logs gem-client | grep "App running at:"
}

function dbIsReady() {
  docker-compose logs gem-db
  echo "--------------------------"
  docker-compose logs gem-db | grep "App running at:"
}

function waitUntilServiceIsReady() {
  attempt=1
  while [ $attempt -le $MAX_TRIES ]; do
    if "$@"; then
      echo "$2 container is up!"
      break
    fi
    echo "Waiting for $2 container... (attempt: $((attempt++)))"
    sleep 5
  done

  if [ $attempt -gt $MAX_TRIES ]; then
    echo "Error: $2 not responding, cancelling set up"
    exit 1
  fi
}

waitUntilServiceIsReady clientIsReady "GEM Client"
waitUntilServiceIsReady dbIsReady "GEM Database"