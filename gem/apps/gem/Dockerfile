FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7-alpine3.8

RUN apk add alpine-sdk gcc openssl-dev libffi-dev && \
    pip install python-multipart pyjwt passlib bcrypt mongoengine python-socketio --no-cache-dir

COPY ./app /app

CMD ["/start-reload.sh"]