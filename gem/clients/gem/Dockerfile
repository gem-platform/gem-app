FROM node:11.13.0-alpine

# Install all the dependences
WORKDIR /usr/src/lib
COPY package.json .
RUN npm install -g @vue/cli @vue/cli-service && npm install && npm install --only=dev && \
    mkdir -p /usr/src/app && \
    mv /usr/src/lib/node_modules /usr/src/app/

# Copy sources
WORKDIR /usr/src/app
COPY . /usr/src/app

# Run app
CMD [ "npm", "run", "serve" ]
