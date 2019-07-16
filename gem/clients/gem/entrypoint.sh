#!/bin/bash
export VUE_APP_GEM_APP_PORT=${GEM_APP_PORT}
npm run serve -- --port ${GEM_CLIENT_PORT}
