# Asset Management System

Sistema web para gerenciamento de ativos empresariais (computadores, monitores, equipamentos de rede, etc).

**Stack:** React 19 + TypeScript + Material UI + Java 21 + Spring Boot + PostgreSQL

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-green)
![React](https://img.shields.io/badge/React-19-blue)
![Test Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)
![Tests](https://img.shields.io/badge/tests-17%20passing-success)

## Funcionalidades

- CRUD completo de ativos
- Filtros por categoria, status e busca textual
- Validações frontend (Zod) e backend (Bean Validation)
- Interface responsiva (desktop, tablet, mobile)
- Feedback visual de todas operações

## Como Executar

### Com Docker Compose (Recomendado)

```bash
git clone <seu-repositorio>
cd asset-management-system
docker-compose up --build
```

Acesse:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/assets
- PostgreSQL: localhost:5432

### Desenvolvimento Local

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**PostgreSQL:**
```bash
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:18-alpine
```

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/assets` | Lista todos os ativos |
| GET | `/api/assets?search=<termo>` | Busca por nome ou serial |
| GET | `/api/assets?category=<cat>` | Filtra por categoria |
| GET | `/api/assets?status=<status>` | Filtra por status |
| GET | `/api/assets/{id}` | Busca por ID |
| POST | `/api/assets` | Cria novo ativo |
| PUT | `/api/assets/{id}` | Atualiza ativo |
| DELETE | `/api/assets/{id}` | Remove ativo |

**Categorias:** `COMPUTER`, `MONITOR`, `PERIPHERAL`, `NETWORK`, `FURNITURE`, `OTHER`  
**Status:** `ACTIVE`, `INACTIVE`, `MAINTENANCE`, `DISPOSED`

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

## Testes

### Backend (17 testes, 90% cobertura)

```bash
cd backend
mvn test

# Relatório de cobertura (JaCoCo)
mvn clean test jacoco:report
# Abrir: backend/target/site/jacoco/index.html
```

**Cobertura:** 90% instruções, 86% linhas, 73% branches, 79% métodos, 100% classes

### Frontend

```bash
cd frontend
npm run test
```

## Tecnologias

**Frontend:**
- React 19, TypeScript, Vite
- Material UI (componentes)
- React Hook Form + Zod (validação)
- Axios (HTTP client)

**Backend:**
- Java 21 LTS
- Spring Boot 4.0.2 (Web, Data JPA, Validation)
- PostgreSQL 18
- Lombok
- JUnit 5 + MockMvc + H2 (testes)
- JaCoCo (cobertura de código)

**DevOps:**
- Docker + Docker Compose
- Multi-stage builds (otimização)

## Estrutura do Projeto

```
asset-management-system/
├── backend/              # API Spring Boot
│   ├── src/
│   │   ├── main/java/com/assets/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/             # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Configuração

### Variáveis de Ambiente

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8080
```

**Backend (application.properties):**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/assetdb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

## Decisões Técnicas

**Material UI vs Tailwind:** MUI fornece componentes complexos prontos (Table, Dialog, Snackbar), acelerando desenvolvimento.

**Zod vs Yup:** Zod tem type inference automática e melhor integração com TypeScript.

**PostgreSQL:** Banco relacional robusto, open-source, compatível com serviços de deploy gratuitos.

**Java 21 LTS:** Versão estável com suporte de longo prazo. Java 25 ainda não tem compatibilidade completa com Maven plugins.

**Testes de Integração:** Testam fluxo completo (controller → service → repository → database) fornecendo maior confiança.

## Validações

**Frontend (Zod):**
- Nome: 3-100 caracteres
- Serial: 3-50 caracteres, único
- Data de compra: não pode ser futura
- Valor: > 0, máximo 999.999.999

**Backend (Bean Validation):**
- Mesmas regras do frontend
- Validação adicional no banco (unique constraint no serialNumber)
- Exception handlers customizados com mensagens claras

## Troubleshooting

**Porta em uso:**
```bash
# Backend (porta 8080)
lsof -ti:8080 | xargs kill -9

# Frontend (porta 5173)
lsof -ti:5173 | xargs kill -9
```

**Docker: banco não conecta:**
```bash
docker-compose down -v  # Remove volumes
docker-compose up --build
```

---

Desenvolvido como desafio técnico Full Stack
