#!/bin/bash

# had to unset path to resolve:
# curl: /opt/splunk/lib/libcrypto.so.1.0.0: version `OPENSSL_1.0.0' not found (required by /usr/lib/x86_64-linux-gnu/libcurl.so.4)
# https://answers.splunk.com/answers/185635/why-splunk-triggered-alert-is-not-working-for-my-s.html

unset LD_LIBRARY_PATH

TOKEN=$(</var/run/secrets/kubernetes.io/serviceaccount/token)

/usr/bin/curl -sSk -H "Authorization: Bearer $TOKEN" https://$KUBERNETES_SERVICE_HOST:$KUBERNETES_PORT_443_TCP_PORT/api/v1/componentstatuses
