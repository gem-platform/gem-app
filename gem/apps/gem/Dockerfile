FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7-alpine3.8

# Install dependencies openssl-dev
RUN apk --no-cache add alpine-sdk gcc libffi-dev python3-dev postgresql-dev && \
    pip install pipenv --no-cache-dir

# Install app
COPY . /app
RUN pipenv install --system
COPY prestart.sh /app/prestart.sh
ENV PORT=9000

# Start application with hotreload
CMD ["/start-reload.sh"]