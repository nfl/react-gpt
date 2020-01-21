.PHONY: all build console lint network shell test

# Variable used to configure the correct docker-compose files when running on CircleCI
DOCKER_COMPOSE_ARGS=

NETWORK_NAME=meliuz
NETWORK_ID=$(shell docker network ls -qf "name=${NETWORK_NAME}")
SERVICE_NAME=lib-react-gpt

all: build

build:
	@docker-compose build
	@docker-compose run --rm ${SERVICE_NAME} mv /tmp/package-lock.json /app/package-lock.json

console:
	@docker-compose run --rm ${SERVICE_NAME} node

network:
	@if [ -n "${NETWORK_ID}" ]; then \
		echo "The ${NETWORK_NAME} network already exists. Skipping..."; \
	else \
		docker network create -d bridge ${NETWORK_NAME}; \
	fi

shell:
	@docker-compose run --rm ${SERVICE_NAME} bash

test: network
	@docker-compose ${DOCKER_COMPOSE_ARGS} run --rm ${SERVICE_NAME} npm test -- ${ARGS}
