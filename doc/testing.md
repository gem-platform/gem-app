# GEM Testing

[![Build Status](https://travis-ci.com/gem-platform/gem-app.svg?branch=master)](https://travis-ci.com/gem-platform/gem-app)
[![codecov](https://codecov.io/gh/gem-platform/gem/branch/master/graph/badge.svg)](https://codecov.io/gh/gem-platform/gem-app)

1. Code coverage at [codecov](https://codecov.io/gh/gem-platform/gem).
2. Continuous Integration at [travis-ci.com](https://travis-ci.com/gem-platform/gem-app)

## Tools

1. [Codecept.io](https://codecept.io/) for end to end testing.
2. [Jest](https://jestjs.io/) for unit testing.

## Folders

- `e2e/features` features
- `e2e/tests` end to end tests
- `gem/apps/gem/tests` python unit tests
- `gem/clients/gem/tests/unit` js unit tests

## How to perform e2e test run

### On host machine

Before you need run docker container with the site up and running
```bash
cd e2e
npm install
npx codeceptjs run
```

## How to perform js unit test run

```bash
npm run test:unit
```

## How to perform python unit test run

```bash
cd tests
pytest
```