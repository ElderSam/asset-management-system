# Asset Management System

Sistema web para gerenciamento de ativos empresariais (computadores, monitores, equipamentos de rede, etc).

**Stack:** React 19 + TypeScript + Material UI + Java 21 + Spring Boot + PostgreSQL

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-green)
![React](https://img.shields.io/badge/React-19-blue)
![Test Coverage](https://img.shields.io/badge/coverage-93%25-brightgreen)
![Tests](https://img.shields.io/badge/tests-31%20passing-success)

## Como Executar (1 comando)

**Pré-requisito:** Docker e Docker Compose instalados

```bash
docker-compose up --build
```

Aguarde ~30 segundos e acesse:

- **Frontend:** http://localhost:5173
- **API REST:** http://localhost:8080/api/assets
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **PostgreSQL:** localhost:5432

```bash
# Acessar banco
docker-compose exec database psql -U postgres -d assetdb

# Parar
docker-compose down
```

## Funcionalidades

- ✅ CRUD completo de ativos
- ✅ Paginação (10 itens por página)
- ✅ Filtros por categoria, status e busca textual
- ✅ Validações frontend (Zod) e backend (Bean Validation)
- ✅ Interface responsiva (desktop, tablet, mobile)
- ✅ Feedback visual (loading, erros, sucesso)
- ✅ Documentação interativa via Swagger

## Estrutura do Projeto

```
asset-management-system/
├── backend/              # API Spring Boot → backend/README.md
├── frontend/             # React App       → frontend/README.md
└── docker-compose.yml
```

## Decisões Técnicas

**Material UI vs Tailwind:** MUI fornece componentes complexos prontos (Table, Dialog, Snackbar), acelerando desenvolvimento.

**Zod vs Yup:** Zod tem type inference automática e melhor integração com TypeScript.

**PostgreSQL:** Banco relacional robusto, open-source, compatível com serviços de deploy gratuitos.

**Java 21 LTS:** Versão estável com suporte de longo prazo.

**Testes de Integração + Unitários:** Integração testa fluxo completo (controller → service → repository → database); unitários testam lógica de negócio isoladamente com Mockito.

**Swagger/OpenAPI (code-first):** springdoc infere automaticamente tipos, validações e códigos HTTP — anotações manuais apenas para o que não é inferível (404, 409).

## Desenvolvimento Local

Para desenvolvimento com hot reload (sem Docker):

**1. PostgreSQL:**
```bash
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:18-alpine
```

**2. Backend (terminal 1):** ver [backend/README.md](backend/README.md)
```bash
cd backend && mvn spring-boot:run
```

**3. Frontend (terminal 2):** ver [frontend/README.md](frontend/README.md)
```bash
cd frontend && npm install && npm run dev
```

## Troubleshooting

**Porta em uso:**
```bash
lsof -ti:8080 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
```

**Docker: banco não conecta:**
```bash
docker-compose down -v && docker-compose up --build
```
