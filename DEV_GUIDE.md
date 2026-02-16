# 🚀 Guia de Desenvolvimento

Este guia explica como desenvolver o projeto localmente com **hot reload** ativo, sem reconstruir Docker a cada mudança.

## 📋 Pré-requisitos

- Docker e Docker Compose
- Java 21 JDK
- Maven 3.9+
- Node.js 20+
- pnpm

## ⚡ Início Rápido

### Modo Desenvolvimento (Recomendado)

Use o script helper que automatiza tudo:

```bash
./dev.sh
```

Este script:
1. ✅ Para containers existentes
2. ✅ Inicia apenas o PostgreSQL no Docker
3. ✅ Mostra instruções para rodar backend e frontend

### Passo a Passo Manual

#### 1. Iniciar PostgreSQL

```bash
docker-compose up database
```

#### 2. Backend (Terminal separado)

```bash
cd backend
mvn spring-boot:run
```

**Features de desenvolvimento:**
- ✅ Hot reload automático (Spring Boot DevTools)
- ✅ Mudanças em código Java aplicadas sem restart
- ✅ Acessa banco PostgreSQL em `localhost:5432`

#### 3. Frontend (Terminal separado)

```bash
cd frontend
pnpm dev
```

**Features de desenvolvimento:**
- ✅ Vite HMR (Hot Module Replacement)
- ✅ Mudanças instantâneas no navegador
- ✅ Fast refresh para React

## 🌐 URLs de Desenvolvimento

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:5173 | Interface React |
| Backend | http://localhost:8080 | API Spring Boot |
| API REST | http://localhost:8080/api/assets | Endpoint principal |
| Swagger UI | http://localhost:8080/swagger-ui.html | Documentação (se habilitado) |
| PostgreSQL | localhost:5432 | Banco de dados |

## 🔄 Workflow de Desenvolvimento

### Fazendo mudanças no Frontend

1. Edite arquivos em `frontend/src/`
2. Salve o arquivo (Ctrl+S)
3. ✅ Navegador atualiza automaticamente

### Fazendo mudanças no Backend

1. Edite arquivos Java em `backend/src/`
2. Salve o arquivo (Ctrl+S)
3. ✅ Spring DevTools recarrega automaticamente
4. Se não recarregar, reinicie com `Ctrl+C` e `mvn spring-boot:run`

### Mudanças no Banco de Dados

O Hibernate está configurado com `ddl-auto=update`:
- ✅ Mudanças em `@Entity` são aplicadas automaticamente
- ⚠️ Para mudanças complexas, pode precisar limpar o banco:

```bash
docker-compose down -v  # Remove volume do PostgreSQL
docker-compose up database  # Recria banco limpo
```

## 🛑 Parando o Ambiente

### Parar Backend/Frontend
- Pressione `Ctrl+C` em cada terminal

### Parar PostgreSQL
```bash
docker-compose down
```

### Limpar Tudo (incluindo dados)
```bash
docker-compose down -v
```

## 🐛 Troubleshooting

### Backend não conecta ao banco

```bash
# Verifique se PostgreSQL está rodando
docker ps | grep asset-db

# Verifique logs do banco
docker logs asset-db
```

### Frontend não encontra API

Verifique o arquivo `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080
```

### Porta já em uso

```bash
# Backend (porta 8080)
lsof -ti:8080 | xargs kill -9

# Frontend (porta 5173)
lsof -ti:5173 | xargs kill -9

# PostgreSQL (porta 5432)
docker-compose down
```

## 📦 Testando Build de Produção

Quando quiser testar o build completo (como será entregue):

```bash
docker-compose down -v
docker-compose up --build
```

**Importante:** Este modo **NÃO** tem hot reload. Use apenas para validar antes de enviar.

## 🎯 Melhores Práticas

### ✅ FAÇA

- Use `./dev.sh` para iniciar desenvolvimento
- Mantenha terminais separados (backend, frontend)
- Teste mudanças incrementalmente
- Commit frequentemente

### ❌ NÃO FAÇA

- Não use `docker-compose up --build` durante desenvolvimento
- Não rode tudo no Docker durante desenvolvimento
- Não pare/inicie containers a cada mudança

## 📚 Recursos Adicionais

- [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools)
- [Vite HMR](https://vitejs.dev/guide/features.html#hot-module-replacement)
- [React Fast Refresh](https://vitejs.dev/guide/features.html#jsx)

---

**Dica:** Adicione este arquivo ao `.gitignore` se contiver configurações locais específicas da sua máquina.
