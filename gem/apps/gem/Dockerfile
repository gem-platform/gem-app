FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Install pipenv and dependencies
COPY Pipfile* /app/
RUN pip install pipenv --no-cache-dir && \
    pipenv install --system && \
    pipenv install --dev --system

# Install app
COPY . /app
COPY prestart.sh /app/prestart.sh

# Start application with hotreload
CMD ["/start-reload.sh"]