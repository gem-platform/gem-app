FROM node:12.4.0-stretch-slim

# Install all the dependences
WORKDIR /tmp/build
COPY package.json .
RUN npm install && \
    mkdir -p /workspaces/gem-client && \
    mv /tmp/build/node_modules /workspaces/gem-client

# Copy sources
WORKDIR /workspaces/gem-client
COPY . .

# Run app
CMD ["npm",  "run", "serve", "--port $GEM_CLIENT_PORT"]
