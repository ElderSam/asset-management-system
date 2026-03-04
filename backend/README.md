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
| GET | `/api/assets` | Lista ativos (paginado, padrão: 10 itens) |
| GET | `/api/assets?page=0&size=10` | Lista com paginação customizada |
| GET | `/api/assets?search=<termo>` | Busca por nome/serial (com paginação) |
| GET | `/api/assets?category=<cat>` | Filtra por categoria (com paginação) |
| GET | `/api/assets?status=<status>` | Filtra por status (com paginação) |
| GET | `/api/assets/{id}` | Busca por ID |
| POST | `/api/assets` | Cria novo |
| PUT | `/api/assets/{id}` | Atualiza |
| DELETE | `/api/assets/{id}` | Remove |

**Categorias:** COMPUTER, MONITOR, PERIPHERAL, NETWORK, FURNITURE, OTHER  
**Status:** ACTIVE, INACTIVE, MAINTENANCE, DISPOSED

### Paginação

Todos os endpoints de listagem suportam paginação via parâmetros:

- `page`: Número da página (começa em 0, padrão: 0)
- `size`: Itens por página (padrão: 10)

**Exemplo de Resposta Paginada:**

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
  "last": false,
  "empty": false
}
```

**Exemplos de Uso:**

```bash
# Primeira página (padrão)
GET /api/assets

# Segunda página com 20 itens
GET /api/assets?page=1&size=20

# Busca "Dell" com paginação
GET /api/assets?search=Dell&page=0&size=10

# Filtros múltiplos + paginação
GET /api/assets?category=COMPUTER&status=ACTIVE&page=0&size=5
```

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
- Data de compra: obrigatória, não pode ser futura (@PastOrPresent)
- Valor: opcional, sem validação
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

### Cobertura: 93%

| Métrica | Cobertura |
|---------|-----------|
| Instruções | 93% (700/746) |
| Linhas | 89% (144/161) |
| Branches | 73% (19/26) |
| Métodos | 86% (39/45) |
| Classes | 100% (14/14) |

### Testes Implementados (31 testes)

**1. Testes de Integração (18 testes) - AssetControllerIntegrationTest**
- Testam fluxo completo: Controller → Service → Repository → Database
- Tecnologias: Spring Boot Test, MockMvc, H2 in-memory
- Cobertura:
  - `GET /api/assets` - listagem vazia, com dados, filtros (search, category, status)
  - `GET /api/assets` - paginação (primeira página, segunda página, tamanhos customizados)
  - `GET /api/assets/{id}` - busca por ID (sucesso, não encontrado)
  - `POST /api/assets` - criação (sucesso, validação, serial duplicado)
  - `PUT /api/assets/{id}` - atualização (sucesso, validação, não encontrado)
  - `DELETE /api/assets/{id}` - remoção (sucesso, não encontrado)

**2. Testes Unitários (12 testes) - AssetServiceImplTest**
- Testam lógica de negócio isoladamente
- Tecnologias: Mockito (mocks), AssertJ (assertions)
- Cobertura:
  - `findAll()` - lista com dados, lista vazia, filtros aplicados, paginação
  - `findById()` - busca existente, não encontrado
  - `create()` - criação com sucesso, serial duplicado
  - `update()` - atualização com sucesso, não encontrado, serial duplicado
  - `delete()` - remoção com sucesso, não encontrado

**3. Teste de Contexto (1 teste) - AssetManagementApplicationTests**
- Verifica inicialização da aplicação Spring Boot

### Tecnologias de Teste

- **JUnit 5**: Framework de testes
- **Spring Boot Test**: Testes de integração com contexto completo
- **MockMvc**: Simula requisições HTTP
- **Mockito**: Criação de mocks para testes unitários
- **AssertJ**: Assertions fluentes e expressivas
- **H2**: Banco em memória para testes
- **JaCoCo**: Relatórios de cobertura de código
- **Hamcrest**: Matchers para validações JSON

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
