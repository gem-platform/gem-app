FROM node:12.4.0-stretch-slim

# Install all the dependences
WORKDIR /tmp/build
COPY package*.json /tmp/build
RUN npm ci \
    mkdir -p /workspaces/gem-client && \
    mv /tmp/build/node_modules /workspaces/gem-client

# Copy sources
WORKDIR /workspaces/gem-client
COPY . .

# Run app
CMD ["sh", "entrypoint.sh"]
