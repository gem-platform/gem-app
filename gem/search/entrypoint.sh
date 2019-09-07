#! /usr/bin/env sh

indexer law --config /opt/sphinx/conf/sphinx.conf
searchd --nodetach --config /opt/sphinx/conf/sphinx.conf
indexer --config /opt/sphinx/conf/sphinx.conf --rotate --all
