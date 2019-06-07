FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Install dependencies openssl-dev
RUN apt-get update && apt-get install python-psycopg2 -y && \
    pip install pipenv --no-cache-dir

# Install app
COPY . /app
RUN pipenv install --system
COPY prestart.sh /app/prestart.sh
ENV PORT=9000
ENV SHELL=bash

# Start application with hotreload
CMD ["/start-reload.sh"]