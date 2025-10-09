PROJECT_NAME=issues-app

DEV_COMPOSE_FILE=docker-compose.dev.yml
PROD_COMPOSE_FILE=docker-compose.yml

# Comandos
.PHONY: dev prod stop logs clean rebuild

dev:
	@echo "Iniciando entorno de desarrollo para $(PROJECT_NAME)..."
	docker compose -f $(DEV_COMPOSE_FILE) up --build

prod:
	@echo "Iniciando entorno de producción para $(PROJECT_NAME)..."
	docker compose -f $(PROD_COMPOSE_FILE) up --build -d

stop:
	@echo "Deteniendo contenedores..."
	docker compose -f $(DEV_COMPOSE_FILE) down || true
	docker compose -f $(PROD_COMPOSE_FILE) down || true

logs:
	@echo "Mostrando logs..."
	docker compose -f $(DEV_COMPOSE_FILE) logs -f || docker compose -f $(PROD_COMPOSE_FILE) logs -f

rebuild:
	@echo "Reconstruyendo imágenes..."
	docker compose -f $(DEV_COMPOSE_FILE) build --no-cache
	docker compose -f $(PROD_COMPOSE_FILE) build --no-cache

clean:
	@echo "Limpiando todo..."
	docker compose -f $(DEV_COMPOSE_FILE) down -v --rmi all || true
	docker compose -f $(PROD_COMPOSE_FILE) down -v --rmi all || true
	docker system prune -f
