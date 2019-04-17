FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7-alpine3.8

# Install dependencies
RUN apk --no-cache add alpine-sdk gcc openssl-dev libffi-dev && \
    pip install pipenv --no-cache-dir

# Install app
COPY . /app
RUN pipenv install --system
ENV PORT=9000

# Start application with hotreload
CMD ["/start-reload.sh"]