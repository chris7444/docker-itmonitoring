#!/bin/bash
dirname=$(dirname $0)
. ${dirname}/ucp.rc

if [ "${UCPK8S_TOKEN}" == "" ]
then
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
else
TOKEN=${UCPK8S_TOKEN}
fi

# had to unset path to resolve:
# curl: /opt/splunk/lib/libcrypto.so.1.0.0: version `OPENSSL_1.0.0' not found (required by /usr/lib/x86_64-linux-gnu/libcurl.so.4)
# https://answers.splunk.com/answers/185635/why-splunk-triggered-alert-is-not-working-for-my-s.html

unset LD_LIBRARY_PATH

/usr/bin/curl -sSk -H "Authorization: Bearer $TOKEN" https://$UCPK8S_URL/api/v1/nodes | jq '.items[] | [{metadata: .metadata, externalID: .spec.externalID, providerID: .spec.providerID, capacity: .status.capacity, allocatable: .status.allocatable, conditions: .status.conditions, nodeInfo: .status.nodeInfo }]'
