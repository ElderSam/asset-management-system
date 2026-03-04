# Backend - Asset Management API

API REST com Spring Boot para gerenciamento de ativos empresariais.

## Stack

- Java 21 LTS
- Spring Boot 4.0.2 (Web, Data JPA, Validation)
- Spring Data JPA + Specification (filtros dinâmicos)
- PostgreSQL 18
- Lombok
- springdoc-openapi 3 (Swagger UI)
- JUnit 5, Mockito, MockMvc, H2, JaCoCo

## Como Rodar

```bash
# PostgreSQL deve estar rodando (porta 5432)
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:18-alpine

mvn spring-boot:run

# API:     http://localhost:8080/api/assets
# Swagger: http://localhost:8080/swagger-ui.html
```

## Endpoints

Base URL: `/api/assets`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/assets` | Lista ativos paginados (padrão: 10 por página) |
| GET | `/api/assets?search=<termo>` | Busca por nome ou serial number |
| GET | `/api/assets?category=<cat>` | Filtra por categoria |
| GET | `/api/assets?status=<status>` | Filtra por status |
| GET | `/api/assets?page=0&size=10` | Paginação customizada |
| GET | `/api/assets/{id}` | Busca por ID |
| POST | `/api/assets` | Cria novo ativo |
| PUT | `/api/assets/{id}` | Atualiza ativo |
| DELETE | `/api/assets/{id}` | Remove ativo |

**Categorias:** `COMPUTER`, `MONITOR`, `PERIPHERAL`, `NETWORK`, `FURNITURE`, `OTHER`
**Status:** `ACTIVE`, `INACTIVE`, `MAINTENANCE`, `DISPOSED`

Filtros podem ser combinados: `?search=Dell&category=COMPUTER&status=ACTIVE&page=0&size=5`

### Paginação

Resposta do `GET /api/assets`:

```json
{
  "content": [
    {
      "id": 1,
      "name": "Dell XPS 15",
      "serialNumber": "DXP-2024-001",
      "category": "COMPUTER",
      "status": "ACTIVE",
      "purchaseDate": "2024-01-15",
      "purchaseValue": 3500.00,
      "location": "São Paulo - Sala 301",
      "description": "Notebook para desenvolvimento"
    }
  ],
  "totalElements": 45,
  "totalPages": 5,
  "size": 10,
  "number": 0,
  "first": true,
  "last": false
}
```

### Exemplo de Request (POST/PUT)

```json
{
  "name": "Dell XPS 15",
  "serialNumber": "DXP-2024-001",
  "category": "COMPUTER",
  "status": "ACTIVE",
  "purchaseDate": "2024-01-15",
  "purchaseValue": 3500.00,
  "location": "São Paulo - Sala 301",
  "description": "Notebook para desenvolvimento"
}
```

## Validações

| Campo | Regra |
|-------|-------|
| name | Obrigatório, 3-100 caracteres |
| serialNumber | Obrigatório, único, 3-50 caracteres |
| category | Obrigatório |
| status | Obrigatório |
| purchaseDate | Obrigatório, não pode ser futura (`@PastOrPresent`) |
| purchaseValue | Opcional |
| location | Opcional, máx 200 caracteres |
| description | Opcional, máx 500 caracteres |

## Testes

```bash
mvn test

# Relatório de cobertura (JaCoCo)
mvn clean test jacoco:report
# Abrir: target/site/jacoco/index.html
```

### Cobertura: 93%

| Métrica | Cobertura |
|---------|-----------|
| Instruções | 93% |
| Linhas | 89% |
| Branches | 73% |
| Métodos | 86% |
| Classes | 100% |

### Testes Implementados (31 testes)

**18 testes de integração** (`AssetControllerIntegrationTest`) — Spring Boot Test + MockMvc + H2
- Listagem vazia, com dados, filtros (search, category, status)
- Paginação (página 0, página 1, tamanhos customizados)
- Busca por ID, criação, atualização, remoção
- Cenários de erro: 404, 409, 400

**12 testes unitários** (`AssetServiceImplTest`) — Mockito + AssertJ
- `findAll()`: com dados, vazio, filtros, paginação
- `findById()`: encontrado, não encontrado
- `create()`: sucesso, serial duplicado
- `update()`: sucesso, não encontrado, serial duplicado
- `delete()`: sucesso, não encontrado

**1 teste de contexto** (`AssetManagementApplicationTests`) — inicialização do Spring Boot

## Configuração

`src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/assetdb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

## Estrutura

```
src/main/java/com/assets/
├── config/        # WebConfig (CORS), OpenApiConfig (Swagger)
├── controller/    # AssetController
├── dto/           # AssetDTO, AssetRequestDTO
├── exception/     # ResourceNotFoundException, DuplicateResourceException, GlobalExceptionHandler
├── model/         # Asset, AssetCategory, AssetStatus
├── repository/    # AssetRepository
└── service/       # AssetService, AssetServiceImpl
```

## Docker

```bash
docker build -t asset-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/assetdb \
  asset-backend
```
