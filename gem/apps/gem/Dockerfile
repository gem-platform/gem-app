FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7-alpine3.8

RUN apk add alpine-sdk gcc openssl-dev libffi-dev && \
    pip install pipenv --no-cache-dir

COPY . /app
RUN pipenv install --system

CMD ["/start-reload.sh"]