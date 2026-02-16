# Backend - Asset Management API

API REST com Spring Boot para gerenciamento de ativos empresariais.

## Stack

- Java 21 LTS
- Spring Boot 4.0.2
- Spring Data JPA
- PostgreSQL 18
- Lombok
- Bean Validation

## Como Rodar

```bash
# 1. PostgreSQL deve estar rodando (porta 5432)
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:18-alpine

# 2. Compilar e rodar
mvn clean install
mvn spring-boot:run

# API disponível em: http://localhost:8080
```

## Endpoints

Base URL: `/api/assets`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/assets` | Lista todos |
| GET | `/api/assets?search=<termo>` | Busca por nome/serial |
| GET | `/api/assets?category=<cat>` | Filtra por categoria |
| GET | `/api/assets?status=<status>` | Filtra por status |
| GET | `/api/assets/{id}` | Busca por ID |
| POST | `/api/assets` | Cria novo |
| PUT | `/api/assets/{id}` | Atualiza |
| DELETE | `/api/assets/{id}` | Remove |

**Categorias:** COMPUTER, MONITOR, PERIPHERAL, NETWORK, FURNITURE, OTHER  
**Status:** ACTIVE, INACTIVE, MAINTENANCE, DISPOSED

## Estrutura

```
src/main/java/com/assets/
├── controller/        # REST Controllers
├── dto/              # DTOs (Records)
├── exception/        # Exception handlers
├── model/            # JPA Entities
├── repository/       # Spring Data Repositories
└── service/          # Lógica de negócio
```

## Validações

- Nome: obrigatório, 3-100 caracteres
- Serial: obrigatório, único, 3-50 caracteres
- Categoria: obrigatória
- Status: obrigatório
- Data de compra: obrigatória, não pode ser futura
- Valor: opcional, > 0
- Localização: opcional, máx 200 caracteres
- Descrição: opcional, máx 500 caracteres

## Testes

```bash
# Rodar testes
mvn test

# Gerar relatório de cobertura (JaCoCo)
mvn clean test jacoco:report
# Abrir: target/site/jacoco/index.html
```

**Cobertura: 90%**

| Métrica | Cobertura |
|---------|-----------|
| Instruções | 90% (611/676) |
| Linhas | 86% (128/148) |
| Branches | 73% (19/26) |
| Métodos | 79% (31/39) |
| Classes | 100% (13/13) |

**Testes implementados:**
- 16 testes de integração (AssetControllerIntegrationTest)
- 1 teste de contexto (AssetManagementApplicationTests)

Tecnologias de teste: JUnit 5, Spring Boot Test, MockMvc, H2, JaCoCo, Hamcrest

## Configuração

`src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/assetdb
spring.datasource.username=postgres
spring.datasource.password=postgres

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server
server.port=8080
```

## Docker

```bash
docker build -t asset-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/assetdb \
  asset-backend
```
