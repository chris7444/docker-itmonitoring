dirname=$(dirname $0)
. $dirname/env.rc
# https://docs.docker.com/engine/reference/commandline/build/
# Build Context:  http://stackoverflow.com/questions/27068596/how-to-include-files-outside-of-dockers-build-context
if [ -z $CURRENT ]; then
	CURRENT=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
fi

docker build --build-arg BRANCH=${BRANCH} -t ${DOCKER_ID}/splunk:${BRANCH}-monitor-k8s -f ./docker-images/enterprise-k8s/Dockerfile $CURRENT
