DOCKER_COMPOSE := docker compose

run: compose/up migrate/up

compose/up:
	$(DOCKER_COMPOSE) up -d

compose/up-no-cache:
	$(DOCKER_COMPOSE) up -d --no-cache

compose/down:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans --rmi local

compose/logs:
	$(DOCKER_COMPOSE) logs -f

DATABASE_NAME := postgres-db
DATABASE      := postgres
psql:
	$(DOCKER_COMPOSE) exec -it $(DATABASE_NAME) psql -U $(DATABASE)



GOOSE_DRIVER   := postgres
GOOSE_DBSTRING ?= host=db user=root dbname=treasure_app password=p@ssword sslmode=disable
migrate/status:
	$(DOCKER_COMPOSE) run --rm migration status

VERSION:=$(shell ls db/migration | awk -F"_*.sql" 'BEGIN {max=0} {split($$1, a, "_"); if(a[1]>max){max = a[1]}}END{print max+1}')
TEMPLATE?=
migrate/new:
	echo '-- +goose Up' > db/migration/${VERSION}_${TEMPLATE}.sql

migrate/up:
	$(DOCKER_COMPOSE) run --rm migration up
