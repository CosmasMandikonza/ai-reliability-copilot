#!/usr/bin/env bash
set -euo pipefail

: "${ELASTIC_ENDPOINT:?Set ELASTIC_ENDPOINT in env}"
: "${ELASTIC_API_KEY:?Set ELASTIC_API_KEY in env}"

hdr=(-H "Content-Type: application/json" -H "Authorization: ApiKey ${ELASTIC_API_KEY}")

echo "Create index template for telemetry-* ..."
curl -s -X PUT "$ELASTIC_ENDPOINT/_index_template/telemetry_template" "${hdr[@]}" -d '{
  "index_patterns": ["telemetry-*"],
  "data_stream": { "hidden": false },
  "template": {
    "mappings": {
      "properties": {
        "@timestamp": {"type": "date"},
        "service": {"type": "keyword"},
        "env": {"type": "keyword"},
        "version": {"type": "keyword"},
        "region": {"type": "keyword"},
        "level": {"type": "keyword"},
        "message": {"type": "text"},
        "trace_id": {"type": "keyword"},
        "deploy_id": {"type": "keyword"},
        "labels": {"type": "object", "dynamic": true}
      }
    }
  }
}'

echo "Create kb_docs index ..."
curl -s -X PUT "$ELASTIC_ENDPOINT/kb_docs" "${hdr[@]}" -d '{
  "mappings": {
    "properties": {
      "title": {"type":"text"},
      "content": {"type":"text"},
      "content_vector": { "type":"dense_vector", "dims": 768, "similarity": "cosine" },
      "service": {"type":"keyword"},
      "tags": {"type":"keyword"},
      "source_uri": {"type":"keyword"},
      "updated_at": {"type":"date"}
    }
  },
  "settings": {
    "index": { "number_of_shards": 1, "number_of_replicas": 0 }
  }
}'
echo "Done."
