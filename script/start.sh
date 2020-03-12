#! /bin/bash

#apm-server run -E "outputx.elasticsearch.hosts=['$ELASTICSEARCH_HOST']" -E "output.elasticsearch.username='$ELASTICSEARCH_USERNAME'" -E "output.elasticsearch.password='$ELASTICSEARCH_PASSWORD'" &
node ./build/server.js
