FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Install pipenv and dependencies
COPY Pipfile* /app/
RUN pip install pipenv --no-cache-dir && \
    pipenv install --system && \
    pipenv install --dev --system

# Install app
COPY . /app
COPY prestart.sh /app/prestart.sh
ENV PORT=9000
ENV SHELL=bash

# Start application with hotreload
CMD ["/start-reload.sh"]