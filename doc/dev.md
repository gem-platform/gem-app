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

With dev config

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

But sometimes it is required to start GEM application on a host machine (for debugging purposes for example). So below is how to start GEM app manually:

### Import all the environment variables

Change DB host in `gem/.env` file. 
```
GEM_DB_HOST=localhost
```

Import all environment varialbles
```bash
cd gem
export $(cat .env | xargs)
```

### Start gem-app

```bash
cd gem/apps/gem
pipenv install
pipenv run uvicorn main:app --port $GEM_APP_PORT --reload
```

### Start front-end

```bash
cd gem/clients/gem
npm install
./entrypoint.sh
```
