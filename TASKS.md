# ✅ Checklist de Desenvolvimento

Este arquivo serve como guia de progresso do projeto.

---

## 📊 PROGRESSO GERAL

- [x] **FASE 0:** Pré-requisitos instalados
- [x] **FASE 1:** Repositório criado e estrutura inicial
- [ ] **FASE 2:** Frontend com dados mockados
- [ ] **FASE 3:** Backend com Spring Boot
- [ ] **FASE 4:** Docker Compose
- [ ] **FASE 5:** Integração Frontend ↔ Backend
- [ ] **FASE 6:** Deploy em produção
- [ ] **FASE 7:** Documentação final

**Tempo estimado total:** 3 dias (24 horas)

---

## ✅ FASE 0: PRÉ-REQUISITOS (COMPLETO)

**Status:** ✅ Concluído  
**Tempo gasto:** 0.5h

- [x] Node.js 20+ instalado
- [x] Java 25 instalado
- [x] Maven instalado
- [x] Docker Desktop instalado e iniciado
- [x] Git configurado
- [x] VS Code com extensões

---

## ✅ FASE 1: REPOSITÓRIO E ESTRUTURA (COMPLETO)

**Status:** ✅ Concluído  
**Tempo gasto:** 0.5h

- [x] Repositório criado no GitHub
- [x] Estrutura de pastas (frontend/ e backend/)
- [x] `.gitignore` criados (raiz, frontend, backend)
- [x] README.md inicial
- [x] TECH_STACK.md criado
- [x] DEVELOPMENT_RULES.md criado
- [x] TASKS.md criado
- [x] Commit inicial e push

---

## 🚧 FASE 2: FRONTEND COM DADOS MOCKADOS

**Status:** 🚧 Em andamento  
**Tempo estimado:** 8-10h (1-1.5 dias)

### Setup Inicial (1-2h)
- [x] Criar projeto React com Vite + TypeScript
- [x] Configurar estrutura de pastas:
  - [x] `src/components/`
  - [x] `src/pages/`
  - [x] `src/services/`
  - [x] `src/types/`
  - [x] `src/data/`
  - [x] `src/theme/`

> **Nota:** As dependências serão instaladas sob demanda conforme necessário em cada etapa.

### Configurações (1h)
- [ ] Criar tema MUI customizado (`src/theme/theme.ts`)
- [ ] Configurar TanStack Query Provider
- [ ] Configurar React Router
- [ ] Limpar arquivos padrão do Vite

### Types e Mock Data (1h)
- [x] Criar tipos TypeScript (`src/types/asset.ts`):
  - [x] `Asset` interface
  - [x] `AssetFormData` type
  - [x] `AssetFilters` interface
  - [x] `AssetStatus` enum
  - [x] `AssetCategory` enum
- [x] Criar dados mockados (`src/data/mockAssets.ts`)
  - [x] Pelo menos 8-10 ativos de exemplo
  - [x] Variação de categorias e status

### Componentes (4-5h)
- [ ] `Layout.tsx` - AppBar + Container
- [ ] `AssetTable.tsx` - Tabela com MUI Table
  - [ ] Colunas: Nome, Nº Série, Categoria, Status, Valor, Data, Ações
  - [ ] Botões de ação (Editar, Excluir)
  - [ ] Formatação de valores (moeda, data)
  - [ ] Badge colorido para status
- [ ] `AssetFilters.tsx` - Barra de filtros
  - [ ] Campo de busca (nome, nº série)
  - [ ] Select de categoria
  - [ ] Select de status
  - [ ] Botão "Limpar filtros"
- [ ] `AssetForm.tsx` - Dialog com formulário
  - [ ] React Hook Form + Zod validation
  - [ ] Campos: nome, nº série, categoria, status, data, valor, localização, descrição
  - [ ] Validações visuais (error messages)
  - [ ] Modo criação/edição
- [ ] `AssetDetails.tsx` - Dialog de visualização (opcional)

### Páginas (1h)
- [ ] `Dashboard.tsx` - Página principal
  - [ ] Integrar Layout
  - [ ] Integrar Filters
  - [ ] Integrar Table
  - [ ] Integrar Form Dialog
  - [ ] Lógica de filtros (search, category, status)
  - [ ] Lógica de CRUD mockado (useState)
- [ ] `NotFound.tsx` - Página 404

### Hooks/Services (1h)
- [ ] `src/services/mockService.ts` - Simular API
  - [ ] `getAssets()`
  - [ ] `getAssetById(id)`
  - [ ] `createAsset(data)`
  - [ ] `updateAsset(id, data)`
  - [ ] `deleteAsset(id)`
  - [ ] Delays simulados (setTimeout)

### Responsividade e Polimento (1h)
- [ ] Testar em diferentes tamanhos de tela
- [ ] Ajustar Grid/Container do MUI
- [ ] Loading states (Skeleton do MUI)
- [ ] Toast notifications (Snackbar do MUI)
- [ ] Confirmação de exclusão (Dialog)

### Dockerfile Frontend
- [ ] Criar `frontend/Dockerfile`
- [ ] Multi-stage build (build + nginx)
- [ ] Testar: `docker build -t frontend .`

### Documentação
- [ ] Atualizar `frontend/README.md`
- [ ] Screenshots da aplicação
- [ ] Commit: `feat: implement frontend with mock data`

---

## 🔜 FASE 3: BACKEND JAVA + SPRING BOOT

**Status:** ⏳ Aguardando  
**Tempo estimado:** 8-10h (1-1.5 dias)

### Setup Inicial (1h)
- [ ] Criar projeto Spring Boot (Spring Initializr)
  - [ ] Dependencies: Web, JPA, PostgreSQL, Validation, Lombok
  - [ ] Java 25, Maven, Jar packaging
- [ ] Estrutura de pacotes:
  - [ ] `config/`
  - [ ] `controller/`
  - [ ] `dto/`
  - [ ] `model/`
  - [ ] `repository/`
  - [ ] `service/`
  - [ ] `exception/`

### Model (1h)
- [ ] `Asset.java` - Entidade JPA
  - [ ] Anotações JPA (@Entity, @Table, @Id, etc)
  - [ ] Bean Validations (@NotBlank, @Size, etc)
  - [ ] Lombok (@Data, @NoArgsConstructor, @AllArgsConstructor)
  - [ ] Timestamps (createdAt, updatedAt)
- [ ] `AssetCategory.java` - Enum
- [ ] `AssetStatus.java` - Enum

### DTOs (1h)
- [ ] `AssetDTO.java` - Request/Response
- [ ] `AssetMapper.java` - Conversão Entity ↔ DTO (ou usar MapStruct)

### Repository (0.5h)
- [ ] `AssetRepository.java` - Interface Spring Data JPA
  - [ ] Herdar `JpaRepository<Asset, Long>`
  - [ ] Métodos customizados (findByCategory, etc)

### Service (2h)
- [ ] `AssetService.java` - Interface
- [ ] `AssetServiceImpl.java` - Implementação
  - [ ] `findAll()`
  - [ ] `findById(id)`
  - [ ] `create(dto)`
  - [ ] `update(id, dto)`
  - [ ] `delete(id)`
  - [ ] Validações de negócio
  - [ ] Tratamento de exceptions

### Controller (2h)
- [ ] `AssetController.java` - REST Controller
  - [ ] `@RestController`, `@RequestMapping("/api/assets")`
  - [ ] `GET /api/assets` - Listar todos
  - [ ] `GET /api/assets/{id}` - Buscar por ID
  - [ ] `POST /api/assets` - Criar
  - [ ] `PUT /api/assets/{id}` - Atualizar
  - [ ] `DELETE /api/assets/{id}` - Deletar
  - [ ] Validação com `@Valid`
  - [ ] ResponseEntity com status codes corretos

### Exception Handling (1h)
- [ ] `GlobalExceptionHandler.java` - @RestControllerAdvice
- [ ] `ResourceNotFoundException.java`
- [ ] `ErrorResponse.java` - DTO de erro
- [ ] Mensagens de erro padronizadas

### Configurações (1h)
- [ ] `CorsConfig.java` - Permitir frontend
- [ ] `application.properties` - Configurar PostgreSQL
  - [ ] URL, username, password
  - [ ] JPA/Hibernate settings
  - [ ] Server port
- [ ] `application-dev.properties` (local)
- [ ] `application-prod.properties` (produção)

### Testes (1h) - Opcional
- [ ] `AssetServiceTest.java` - Testes unitários
- [ ] `AssetControllerTest.java` - Testes de integração

### Dockerfile Backend
- [ ] Criar `backend/Dockerfile`
- [ ] Multi-stage build (maven build + runtime)
- [ ] Testar: `docker build -t backend .`

### Documentação
- [ ] Atualizar `backend/README.md`
- [ ] Exemplos de endpoints (curl)
- [ ] Commit: `feat: implement backend REST API`

---

## 🔜 FASE 4: DOCKER COMPOSE

**Status:** ⏳ Aguardando  
**Tempo estimado:** 2-3h

### Docker Compose (2h)
- [ ] Criar `docker-compose.yml` na raiz
- [ ] Configurar serviço `postgres`:
  - [ ] Imagem: `postgres:16`
  - [ ] Variáveis de ambiente (DB, USER, PASSWORD)
  - [ ] Volume para persistência
  - [ ] Porta: 5432
- [ ] Configurar serviço `backend`:
  - [ ] Build: `./backend`
  - [ ] Depende de `postgres`
  - [ ] Variáveis de ambiente (DATABASE_URL)
  - [ ] Porta: 8080
  - [ ] Healthcheck
- [ ] Configurar serviço `frontend`:
  - [ ] Build: `./frontend`
  - [ ] Depende de `backend`
  - [ ] Variáveis de ambiente (VITE_API_URL)
  - [ ] Porta: 5173
- [ ] Configurar networks
- [ ] Configurar volumes

### Testes (1h)
- [ ] `docker-compose up --build` - Testar build
- [ ] Verificar logs de cada serviço
- [ ] Testar frontend: http://localhost:5173
- [ ] Testar backend: http://localhost:8080/api/assets
- [ ] Testar banco: `docker exec -it <container> psql`
- [ ] `docker-compose down` - Limpar

### Documentação
- [ ] Atualizar README.md (seção Docker Compose)
- [ ] Troubleshooting comum
- [ ] Commit: `feat: add docker compose orchestration`

---

## 🔜 FASE 5: INTEGRAÇÃO FRONTEND ↔ BACKEND

**Status:** ⏳ Aguardando  
**Tempo estimado:** 3-4h

### API Service (1h)
- [ ] Criar `src/services/api.ts`:
  - [ ] Axios instance configurado
  - [ ] Base URL (variável de ambiente)
  - [ ] Interceptors (error handling)
- [ ] Criar `src/services/assetService.ts`:
  - [ ] `fetchAssets()`
  - [ ] `fetchAssetById(id)`
  - [ ] `createAsset(data)`
  - [ ] `updateAsset(id, data)`
  - [ ] `deleteAsset(id)`

### TanStack Query Hooks (1h)
- [ ] `src/hooks/useAssets.ts`:
  - [ ] `useQuery` para listar ativos
  - [ ] Configurar cache, refetch
- [ ] `src/hooks/useCreateAsset.ts`:
  - [ ] `useMutation` para criar
  - [ ] Invalidar cache após sucesso
- [ ] `src/hooks/useUpdateAsset.ts`:
  - [ ] `useMutation` para atualizar
- [ ] `src/hooks/useDeleteAsset.ts`:
  - [ ] `useMutation` para deletar

### Integração nos Componentes (1h)
- [ ] Remover mock service
- [ ] Atualizar `Dashboard.tsx`:
  - [ ] Usar `useAssets()` em vez de mock
  - [ ] Loading states (Skeleton)
  - [ ] Error states (Alert)
- [ ] Atualizar `AssetForm.tsx`:
  - [ ] Usar mutations em vez de mock
  - [ ] Feedback de sucesso/erro

### Variáveis de Ambiente (0.5h)
- [ ] Criar `frontend/.env`:
  - [ ] `VITE_API_URL=http://localhost:8080`
- [ ] Criar `frontend/.env.production`:
  - [ ] `VITE_API_URL=<URL_BACKEND_PRODUCAO>`

### Testes (0.5h)
- [ ] Testar CRUD completo:
  - [ ] Listar ativos (GET)
  - [ ] Criar novo ativo (POST)
  - [ ] Editar ativo (PUT)
  - [ ] Deletar ativo (DELETE)
- [ ] Testar filtros e busca
- [ ] Testar validações (frontend + backend)

### Documentação
- [ ] Atualizar README.md
- [ ] Commit: `feat: integrate frontend with backend API`

---

## 🔜 FASE 6: DEPLOY EM PRODUÇÃO

**Status:** ⏳ Aguardando  
**Tempo estimado:** 3-4h

### Deploy Backend (1.5h)
- [ ] Escolher plataforma (Render ou Railway)
- [ ] Criar conta e novo projeto
- [ ] Conectar repositório GitHub
- [ ] Configurar build (Maven):
  - [ ] Build command: `mvn clean package`
  - [ ] Start command: `java -jar target/*.jar`
- [ ] Criar banco PostgreSQL (no Render/Railway)
- [ ] Configurar variáveis de ambiente:
  - [ ] `DATABASE_URL`
  - [ ] `SPRING_PROFILES_ACTIVE=prod`
- [ ] Deploy e testar endpoints

### Deploy Frontend (1.5h)
- [ ] Escolher plataforma (Vercel ou Netlify)
- [ ] Criar conta e novo projeto
- [ ] Conectar repositório GitHub
- [ ] Configurar build:
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
  - [ ] Root directory: `frontend`
- [ ] Configurar variável de ambiente:
  - [ ] `VITE_API_URL=<URL_BACKEND_PRODUCAO>`
- [ ] Deploy e testar aplicação

### Testes de Integração (0.5h)
- [ ] Testar frontend produção → backend produção
- [ ] CRUD completo em produção
- [ ] Validações funcionando
- [ ] CORS configurado corretamente

### Documentação
- [ ] Adicionar links de deploy no README.md
- [ ] Seção "Links" com URLs públicas
- [ ] Commit: `chore: add production deployment links`

---

## 🔜 FASE 7: DOCUMENTAÇÃO FINAL

**Status:** ⏳ Aguardando  
**Tempo estimado:** 2-3h

### README.md Completo
- [ ] Descrição detalhada do projeto
- [ ] Badges (status, tecnologias)
- [ ] Screenshots/GIFs da aplicação
- [ ] Instruções de execução (Docker + Local)
- [ ] Endpoints da API com exemplos
- [ ] Estrutura do projeto
- [ ] Links de deploy
- [ ] Roadmap de melhorias futuras
- [ ] Informações do autor

### Outros Documentos
- [ ] `TECH_STACK.md` completo e atualizado
- [ ] `DEVELOPMENT_RULES.md` atualizado
- [ ] `DEPLOY.md` - Guia de deploy detalhado
- [ ] `.github/workflows/` - CI/CD (opcional)

### Screenshots
- [ ] Dashboard desktop
- [ ] Dashboard mobile
- [ ] Formulário de cadastro
- [ ] Filtros em ação
- [ ] Validações de erro
- [ ] Criar GIF demonstrativo (opcional)

### Revisão Final
- [ ] Revisar todos os commits (conventional commits)
- [ ] Verificar que não há credenciais no código
- [ ] Testar clone fresh do repositório
- [ ] Testar `docker-compose up` do zero
- [ ] Todos os links funcionando

### Commit Final
- [ ] `docs: final documentation and screenshots`
- [ ] Tag de versão: `git tag v1.0.0`
- [ ] Push: `git push origin main --tags`

---

## 🎯 ESTRATÉGIA PARA SE DESTACAR

### Código
- [ ] Código limpo e organizado
- [ ] TypeScript com tipos bem definidos
- [ ] Validações robustas (frontend + backend)
- [ ] Tratamento de erros consistente
- [ ] Loading states em todas as operações
- [ ] Confirmações antes de deletar
- [ ] Mensagens de feedback ao usuário

### UI/UX
- [ ] UI moderna e profissional (Material UI)
- [ ] Responsiva (mobile, tablet, desktop)
- [ ] Animações sutis (transitions do MUI)
- [ ] Feedback visual claro
- [ ] Navegação intuitiva

### DevOps
- [ ] Docker Compose plug-and-play (1 comando)
- [ ] Builds otimizados (multi-stage)
- [ ] Variáveis de ambiente bem documentadas
- [ ] Logs claros

### Documentação
- [ ] README excepcional (claro, completo)
- [ ] Instruções precisas
- [ ] Exemplos práticos
- [ ] Screenshots ilustrativos
- [ ] Links funcionais

### Git
- [ ] Commits organizados (conventional commits)
- [ ] Mensagens descritivas
- [ ] Histórico limpo

---

## 📊 CHECKLIST DE ENTREGA

Antes de enviar, verificar:

- [ ] ✅ Repositório público no GitHub
- [ ] ✅ README.md completo e claro
- [ ] ✅ `docker-compose up --build` funciona sem erros
- [ ] ✅ Frontend acessível em http://localhost:5173
- [ ] ✅ Backend acessível em http://localhost:8080
- [ ] ✅ CRUD completo funcionando
- [ ] ✅ Validações frontend e backend
- [ ] ✅ Filtros funcionando
- [ ] ✅ Deploy em produção (frontend + backend)
- [ ] ✅ Links públicos testados e funcionando
- [ ] ✅ Screenshots no README
- [ ] ✅ Código sem credenciais hardcoded
- [ ] ✅ `.gitignore` configurados
- [ ] ✅ Commits com mensagens claras

---

**Última atualização:** Fase 1 concluída - Fevereiro 2026
