# Configuring a development environment

## Install dev-environment on a host machine

In order to have good development experience, please install the following:

1. Install nodejs
2. Install python3
3. Visual Studio Code

## Start applications

The easiest way to start the GEM application is to run into docker containers:

```bash
cd gem
docker-compose build
docker-compose up
```

But sometimes it is required to start GEM application on a host machine (for debugging purposes for example). So below is how to start GEM app manually:

### Start gem-app

```bash
cd gem/apps/gem
pipenv install
pipenv run
pipenv run uvicorn main:app
```

### Start front-end

```bash
cd gem/clients/gem
npm install
npm run serve
```