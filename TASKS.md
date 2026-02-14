## FASES
### FASE 1: CRIAR REPOSITÓRIO NO GITHUB

### FASE 2: FRONTEND COM DADOS MOCKADOS (Prioridade 1)
O que vamos fazer:

✅ Setup do projeto React 19 + TypeScript + Vite
✅ Instalar dependências (TailwindCSS, shadcn/ui, React Hook Form, Zod, etc)
✅ Criar estrutura de pastas (components, pages, hooks, services, types)
✅ Mockar dados de ativos (arquivo JSON local)
✅ Implementar Dashboard com tabela/grid
✅ Implementar filtros (categoria, status)
✅ Implementar formulário de cadastro/edição com validação
✅ Estado gerenciado (Zustand ou Context API)
✅ Estilização completa e responsiva
✅ Dockerfile do frontend
✅ Atualizar README com instruções do frontend


### FASE 3: BACKEND JAVA + SPRING BOOT (Prioridade 2)
O que vamos fazer:

✅ Setup projeto Spring Boot (via Spring Initializr)
✅ Estrutura de pastas (model, repository, service, controller, dto, config)
✅ Criar entidade Asset (JPA)
✅ Criar repository (Spring Data JPA)
✅ Criar service (lógica de negócio)
✅ Criar controller (endpoints REST)
✅ Configurar PostgreSQL (application.properties)
✅ Validações (Bean Validation)
✅ CORS configurado para o frontend
✅ Dockerfile do backend
✅ Atualizar README com instruções do backend


### FASE 4: DOCKER COMPOSE (Orquestração)
O que vamos fazer:

✅ Criar docker-compose.yml na raiz
✅ Configurar 3 serviços:

postgres (banco de dados)
backend (API Spring Boot)
frontend (React app)


✅ Configurar networks e volumes
✅ Testar tudo localmente: docker-compose up
✅ Atualizar README com instruções Docker


### FASE 5: INTEGRAÇÃO FRONTEND ↔ BACKEND
O que vamos fazer:

✅ Remover dados mockados do frontend
✅ Criar service HTTP (Axios) no frontend
✅ Conectar frontend com API real
✅ Testar CRUD completo
✅ Ajustar tratamento de erros
✅ Loading states
✅ Atualizar README


### FASE 6: DEPLOY SEPARADO
Frontend (Vercel/Netlify):

✅ Preparar build de produção
✅ Configurar variáveis de ambiente (API_URL)
✅ Deploy no Vercel ou Netlify
✅ Testar frontend em produção

Backend (Render/Railway):

✅ Configurar banco PostgreSQL (Render/Railway)
✅ Deploy do backend
✅ Configurar variáveis de ambiente
✅ Testar API em produção

Conexão:

✅ Atualizar frontend para apontar para API de produção
✅ Testar integração completa
✅ Atualizar README com links e instruções de deploy


### FASE 7: DOCUMENTAÇÃO FINAL
README.md completo com:

✅ Descrição do projeto
✅ Tecnologias utilizadas
✅ Decisões técnicas (por que cada tech)
✅ Como rodar localmente (Docker Compose)
✅ Como rodar sem Docker (dev mode)
✅ Estrutura do projeto
✅ Endpoints da API
✅ Screenshots/GIFs da aplicação
✅ Links para deploy (frontend + backend)
✅ Melhorias futuras


## 🎯 ESTRATÉGIA PARA SE DESTACAR

✅ Código limpo e organizado (pastas bem estruturadas)
✅ TypeScript no frontend (type safety)
✅ Validações robustas (frontend + backend)
✅ UI moderna e responsiva (TailwindCSS + shadcn/ui)
✅ Docker Compose plug-and-play (1 comando e roda tudo)
✅ README excepcional (claro, completo, com exemplos)
✅ Commits organizados (conventional commits)
✅ Deploy funcional (links públicos testáveis)
✅ Tratamento de erros (mensagens amigáveis)
✅ Loading states (UX agradável)

## ESTRUTURA DE PASTAS
Vou criar esta estrutura:
```
asset-management-system/
├── .gitignore                 # Gitignore raiz
├── README.md                  # Documentação principal
├── docker-compose.yml         # Orquestração (criamos depois)
│
├── frontend/                  # Projeto React completo
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── README.md
│   └── (resto criamos na Fase 2)
│
└── backend/                   # Projeto Spring Boot completo
    ├── .gitignore
    ├── Dockerfile
    ├── pom.xml
    ├── README.md
    └── (resto criamos na Fase 3)
```