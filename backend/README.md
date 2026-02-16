# Asset Management - Backend

API REST desenvolvida com Spring Boot para gerenciamento de ativos empresariais.

## 🚀 Tecnologias

- Java 25
- Spring Boot 4.0.2
- Spring Data JPA
- PostgreSQL 16
- Bean Validation
- Lombok
- Maven

## 📋 Pré-requisitos

- Java 25 instalado
- Maven 3.9+ instalado
- PostgreSQL 16 rodando (ou via Docker)

## 🗄️ Configurar Banco de Dados

### Opção 1: PostgreSQL via Docker

```bash
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16
```

### Opção 2: PostgreSQL local

Criar banco de dados:

```sql
CREATE DATABASE assetdb;
```

## ▶️ Como Executar

### 1. Instalar dependências

```bash
mvn clean install
```

### 2. Rodar aplicação

```bash
mvn spring-boot:run
```

A API estará disponível em: **http://localhost:8080**

## 📡 Endpoints da API

### Base URL: `/api/assets`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/assets` | Lista todos os ativos |
| GET | `/api/assets?search=dell` | Busca por nome ou nº série |
| GET | `/api/assets?category=COMPUTER` | Filtra por categoria |
| GET | `/api/assets?status=ACTIVE` | Filtra por status |
| GET | `/api/assets/{id}` | Busca ativo por ID |
| POST | `/api/assets` | Cria novo ativo |
| PUT | `/api/assets/{id}` | Atualiza ativo existente |
| DELETE | `/api/assets/{id}` | Remove ativo |

### Categorias válidas

- `COMPUTER`
- `MONITOR`
- `PERIPHERAL`
- `NETWORK`
- `FURNITURE`
- `OTHER`

### Status válidos

- `ACTIVE`
- `INACTIVE`
- `MAINTENANCE`
- `DISPOSED`

### Exemplo de Payload (POST/PUT)

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

### Exemplo de Resposta (GET)

```json
{
  "id": 1,
  "name": "Dell XPS 15",
  "serialNumber": "DXP-2024-001",
  "category": "COMPUTER",
  "status": "ACTIVE",
  "purchaseDate": "2024-01-15",
  "purchaseValue": 3500.00,
  "location": "São Paulo - Sala 301",
  "description": "Notebook para desenvolvimento",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

## 🏗️ Estrutura do Projeto

```
backend/
├── src/main/java/com/assets/
│   ├── controller/        # REST Controllers
│   ├── dto/              # Data Transfer Objects (Records)
│   ├── exception/        # Custom Exceptions e Handlers
│   ├── model/            # JPA Entities
│   ├── repository/       # Spring Data Repositories
│   └── service/          # Lógica de negócio
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## 🔒 Validações

- Nome: obrigatório, entre 3-100 caracteres
- Número de série: obrigatório, único, entre 3-50 caracteres
- Categoria: obrigatória
- Status: obrigatório
- Data de compra: obrigatória, não pode ser futura
- Valor de compra: opcional, deve ser > 0
- Localização: opcional, máximo 200 caracteres
- Descrição: opcional, máximo 500 caracteres

## ⚙️ Configuração

Editar `src/main/resources/application.properties`:

```properties
# Banco de dados
spring.datasource.url=jdbc:postgresql://localhost:5432/assetdb
spring.datasource.username=postgres
spring.datasource.password=postgres

# Porta do servidor
server.port=8080
```

## 🐳 Docker

Build da imagem:

```bash
docker build -t asset-management-backend .
```

Rodar container:

```bash
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/assetdb \
  asset-management-backend
```
