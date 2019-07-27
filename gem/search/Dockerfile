FROM python:3.7-alpine3.10

ENV SPHINX_VERSION 3.1.1
ENV SPHINX_REVISION 612d99f

# Install pipenv and dependencies
COPY Pipfile* /app/
RUN pip install pipenv --no-cache-dir && \
    pipenv install --system && \
    pipenv install --dev --system

RUN apk add --no-cache mariadb-connector-c-dev \
	postgresql-dev \
	wget

RUN mkdir -p /opt/sphinx/index && \
    mkdir -p /opt/sphinx/log && \
    mkdir -p /var/run/sphinx && \
    chmod +x /usr/app/entrypoint.sh

VOLUME /opt/sphinx/index

# http://sphinxsearch.com/downloads/current/
RUN wget http://sphinxsearch.com/files/sphinx-${SPHINX_VERSION}-${SPHINX_REVISION}-linux-amd64-musl.tar.gz -O /tmp/sphinxsearch.tar.gz
RUN cd /opt/sphinx && tar -xf /tmp/sphinxsearch.tar.gz
RUN rm /tmp/sphinxsearch.tar.gz

ENV PATH "${PATH}:/opt/sphinx/sphinx-${SPHINX_VERSION}/bin"
RUN indexer -v

RUN ln -sv /dev/stdout /opt/sphinx/log/query.log
RUN ln -sv /dev/stdout /opt/sphinx/log/searchd.log

EXPOSE 36307

VOLUME /opt/sphinx/conf

CMD searchd --nodetach --config /opt/sphinx/conf/sphinx.conf