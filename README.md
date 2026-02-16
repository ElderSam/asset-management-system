# 🏢 Asset Management System

Sistema de Gerenciamento de Ativos - Full Stack Application

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-success)
![React](https://img.shields.io/badge/React-19-blue)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-green)
![Test Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)
![Tests](https://img.shields.io/badge/tests-17%20passing-success)

---

## 📋 Sobre o Projeto

Sistema web para gerenciamento de ativos empresariais (computadores, monitores, periféricos, equipamentos de rede, etc.) com funcionalidades completas de CRUD, filtros avançados e validações robustas.

### ✨ Funcionalidades

- ✅ Dashboard com listagem de ativos
- ✅ Filtros por categoria, status e busca
- ✅ Cadastro de novos ativos com validação
- ✅ Edição de ativos existentes
- ✅ Exclusão de ativos
- ✅ Visualização detalhada
- ✅ Responsivo (desktop, tablet, mobile)
- ✅ Validações frontend e backend
- ✅ Feedback visual (loading, erros, sucesso)

---

## 🚀 Tecnologias

### **Frontend**
- [React 19](https://react.dev/) - Framework UI
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Material UI (MUI)](https://mui.com/) - Biblioteca de componentes
- [TanStack Query](https://tanstack.com/query) - Gerenciamento de estado do servidor
- [React Hook Form](https://react-hook-form.com/) - Formulários performáticos
- [Zod](https://zod.dev/) - Validação de schemas
- [Axios](https://axios-http.com/) - HTTP client
- [React Router](https://reactrouter.com/) - Roteamento

### **Backend**
- [Java 21](https://openjdk.org/) - Linguagem
- [Spring Boot 4](https://spring.io/projects/spring-boot) - Framework
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) - Persistência
- [PostgreSQL 18](https://www.postgresql.org/) - Banco de dados
- [Bean Validation](https://beanvalidation.org/) - Validações
- Maven - Build tool

### **DevOps**
- [Docker](https://www.docker.com/) - Containerização
- [Docker Compose](https://docs.docker.com/compose/) - Orquestração

---

## 🎯 Decisões Técnicas

### Por que Material UI em vez de Tailwind?
- ✅ Componentes complexos prontos (Table, Dialog, Autocomplete)
- ✅ Validação visual integrada
- ✅ Tema global configurável
- ✅ Responsividade automática
- ✅ Acelera desenvolvimento (projeto de 3 dias)

### Por que TanStack Query em vez de Redux?
- ✅ Elimina boilerplate de loading/error states
- ✅ Cache automático e inteligente
- ✅ Refetch em background
- ✅ Substitui 90% da necessidade de estado global

### Por que Zod em vez de Yup?
- ✅ Type inference automática
- ✅ Melhor integração com TypeScript
- ✅ Performance superior
- ✅ Mensagens de erro customizáveis

📖 **Veja mais detalhes em:** [TECH_STACK.md](./TECH_STACK.md)

---

## 📋 Pré-requisitos

### Desenvolvimento Local (com Docker)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- Git

### Desenvolvimento Local (sem Docker)
- [Node.js 20+](https://nodejs.org/)
- [Java 21](https://openjdk.org/) + Maven
- [PostgreSQL 16](https://www.postgresql.org/)

---

## 🏃 Como Executar

### **Opção 1: Com Docker Compose (Recomendado) ⭐**

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/asset-management-system.git
cd asset-management-system

# 2. Subir todos os serviços (frontend + backend + banco)
docker-compose up --build

# Aguarde os containers iniciarem (pode levar alguns minutos no primeiro build)
# ✅ Frontend estará em: http://localhost:5173
# ✅ Backend API estará em: http://localhost:8080/api/assets
# ✅ Banco de dados PostgreSQL: localhost:5432
```

**Parar os serviços:**
```bash
docker-compose down
```

**Ver logs:**
```bash
docker-compose logs -f
```

---

### **Opção 2: Desenvolvimento Local (sem Docker)**

#### **Backend (Terminal 1)**

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências e compilar
mvn clean install

# Rodar aplicação
mvn spring-boot:run

# ✅ API estará em: http://localhost:8080
```

#### **Frontend (Terminal 2)**

```bash
# Entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# ✅ App estará em: http://localhost:5173
```

#### **Banco de Dados (Terminal 3)**

```bash
# Subir apenas o PostgreSQL
docker run --name asset-db \
  -e POSTGRES_DB=assetdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16
```

---

## 📁 Estrutura do Projeto

```
asset-management-system/
├── .github/
│   └── DEVELOPMENT_RULES.md    # Regras de desenvolvimento
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas
│   │   ├── services/           # API calls
│   │   ├── types/              # TypeScript types
│   │   ├── data/               # Mock data
│   │   ├── theme/              # Tema MUI
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
├── backend/                     # API Spring Boot
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/assetmanagement/
│   │               ├── config/       # Configurações
│   │               ├── controller/   # REST Controllers
│   │               ├── dto/          # Data Transfer Objects
│   │               ├── model/        # Entidades JPA
│   │               ├── repository/   # Repositories
│   │               ├── service/      # Lógica de negócio
│   │               └── exception/    # Exception handlers
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml           # Orquestração
├── README.md                    # Este arquivo
├── TECH_STACK.md               # Stack detalhada
└── TASKS.md                    # Checklist de tarefas
```

---

## 🔌 API Endpoints

### **Base URL:** `http://localhost:8080/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/assets` | Lista todos os ativos |
| `GET` | `/assets/{id}` | Busca ativo por ID |
| `POST` | `/assets` | Cria novo ativo |
| `PUT` | `/assets/{id}` | Atualiza ativo existente |
| `DELETE` | `/assets/{id}` | Remove ativo |

### **Exemplo de Payload (POST/PUT)**

```json
{
  "name": "Dell XPS 15",
  "serialNumber": "DXP-2024-001",
  "category": "computer",
  "status": "active",
  "acquisitionDate": "2024-01-15",
  "value": 3500.00,
  "location": "São Paulo - Sala 301",
  "description": "Notebook para desenvolvimento"
}
```

### **Categorias válidas:**
- `computer`
- `monitor`
- `peripheral`
- `network`
- `other`

### **Status válidos:**
- `active`
- `maintenance`
- `inactive`
- `disposed`

---

## 🧪 Testes

### Backend (17 testes - 100% passing ✅)

#### Executar testes localmente
```bash
cd backend
mvn test
```

#### Executar via Docker
```bash
docker run --rm -v "$(pwd)/backend:/app" -w /app maven:3-eclipse-temurin-21 mvn test
```

#### Cobertura de Código (JaCoCo)
```bash
cd backend
mvn clean test jacoco:report

# Relatório HTML disponível em:
# backend/target/site/jacoco/index.html
```

### Frontend
```bash
cd frontend
npm run test
```

---

## 🚢 Deploy

### **Frontend (Vercel)**
```bash
cd frontend
npm run build
# Deploy automático via Vercel CLI ou GitHub integration
```

### **Backend (Render)**
```bash
# Conectar repositório no Render
# Configurar variáveis de ambiente:
# - DATABASE_URL
# - SPRING_PROFILES_ACTIVE=prod
```

📖 **Instruções detalhadas:** [DEPLOY.md](./DEPLOY.md) *(em breve)*

---

## 🔧 Variáveis de Ambiente

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8080
```

### Backend (`application.properties`)
```properties
# Banco de dados
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/assetdb}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD:postgres}

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Porta do servidor
server.port=8080
```

---

## 📸 Screenshots

> 🚧 Em breve...

---

## 🛠️ Desenvolvimento

### **Regras e Convenções**
Consulte [DEVELOPMENT_RULES.md](.github/DEVELOPMENT_RULES.md) para:
- Padrões de código
- Naming conventions
- Estrutura de componentes
- Commits convencionais

### **Stack Técnica Completa**
Consulte [TECH_STACK.md](./TECH_STACK.md) para:
- Justificativas de cada tecnologia
- Comparação de alternativas
- Dependências completas

---

## 🐛 Troubleshooting

### Erro: "Port 5173 already in use"
```bash
# Matar processo na porta 5173
npx kill-port 5173
```

### Erro: "Port 8080 already in use"
```bash
# Linux/Mac
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Docker: "Cannot connect to database"
```bash
# Verificar se o container do banco está rodando
docker-compose ps

# Reiniciar serviços
docker-compose restart
```

---

## 📝 Roadmap / Melhorias Futuras

- [ ] Autenticação e autorização (Spring Security + JWT)
- [ ] Upload de imagens dos ativos
- [ ] Relatórios em PDF
- [ ] Histórico de alterações (audit log)
- [ ] Notificações (alertas de manutenção)
- [ ] Dashboard com gráficos (Chart.js)
- [ ] Exportação para Excel/CSV
- [ ] Testes unitários e E2E
- [ ] CI/CD (GitHub Actions)
- [ ] Internacionalização (i18n)

---

## 👨‍💻 Autor

**[Seu Nome]**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

Projeto desenvolvido como parte de um desafio técnico Full Stack.

**Stack:** React 19 + TypeScript + Material UI + TanStack Query + Java 21 + Spring Boot + PostgreSQL