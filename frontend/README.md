# 🎨 Frontend - Asset Management System

Interface web moderna para gerenciamento de ativos empresariais.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Material-UI](https://img.shields.io/badge/MUI-7.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🎯 Teste Rápido (2 minutos)

**Quer testar sem instalar Node.js?** Use Docker!

```bash
docker build -t asset-management-frontend .
docker run -d -p 8080:80 --name asset-frontend asset-management-frontend
# Acesse: http://localhost:8080
```

**Tem Node.js instalado?** Rode em desenvolvimento:

```bash
pnpm install && pnpm dev
# Acesse: http://localhost:5173
```


---

## 📋 Tecnologias

- **React 19** - Framework UI
- **TypeScript 5.9** - Type safety
- **Vite** - Build tool ultra-rápido
- **Material UI (MUI) 7** - Biblioteca de componentes
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

> 📖 **[Decisões Técnicas Detalhadas](./TECHNICAL_DECISIONS.md)** - Entenda o raciocínio por trás de cada escolha técnica

---

## 🚀 Quick Start

### ⚡ **Opção 1: Com Docker (Recomendado - Zero Configuração)**

**Pré-requisito:** Apenas [Docker](https://docs.docker.com/get-docker/) instalado

```bash
# 1. Build da imagem
docker build -t asset-management-frontend .

# 2. Rodar o container
docker run -d -p 8080:80 --name asset-frontend asset-management-frontend

# 3. Abrir no browser → http://localhost:8080
```

**✅ Pronto!** Aplicação rodando em produção (Nginx + build otimizado)

---

### 🛠️ **Opção 2: Desenvolvimento Local (Precisa Node.js)**

**Pré-requisitos:** Node.js 20+ e pnpm (ou npm/yarn)

```bash
# 1. Instalar dependências
pnpm install

# 2. Rodar em modo desenvolvimento
pnpm dev

# 3. Abrir no browser → http://localhost:5173
```

**Build para produção (sem Docker):**
```bash
pnpm build    # Cria build otimizado em /dist
pnpm preview  # Preview do build local
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx
│   ├── AssetTable.tsx
│   ├── AssetFilters.tsx
│   ├── AssetForm.tsx
│   └── ConfirmDialog.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── services/           # Serviços (API calls, mock)
│   └── mockService.ts
├── types/              # TypeScript types
│   └── asset.ts
├── data/               # Dados mockados
│   └── mockAssets.ts
├── theme/              # Tema MUI customizado
│   └── theme.ts
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point
```

---

## ✨ Funcionalidades

### CRUD Completo
- ✅ **Criar** novo ativo
- ✅ **Visualizar** lista de ativos
- ✅ **Editar** ativo existente
- ✅ **Deletar** ativo (com confirmação)

### Filtros Avançados
- 🔍 Busca por nome ou número de série
- 📂 Filtro por categoria (Computador, Monitor, Periférico, Rede, Móvel, Outro)
- 📊 Filtro por status (Ativo, Inativo, Manutenção, Aposentado)

### Validações
- ✅ React Hook Form + Zod
- ✅ Validações em tempo real
- ✅ Mensagens de erro claras
- ✅ Campos obrigatórios marcados

### UX/UI
- 🎨 Design moderno com Material UI
- 📱 100% Responsivo (mobile, tablet, desktop)
- ⚡ Loading states durante operações
- 🔔 Notificações de sucesso/erro (Snackbar)
- ⚠️ Confirmação antes de deletar
- 💾 Feedback visual em todas as ações

---

## 🎯 Dados Mockados

A aplicação atualmente utiliza dados mockados para desenvolvimento (`src/services/mockService.ts`).

**Mock Service inclui:**
- `getAssets()` - Lista todos os ativos
- `getAssetById(id)` - Busca por ID
- `createAsset(data)` - Cria novo ativo
- `updateAsset(id, data)` - Atualiza ativo
- `deleteAsset(id)` - Deleta ativo
- Delays simulados (200-500ms) para simular chamadas de rede

> **Nota:** Na FASE 5, o mock será substituído por chamadas reais ao backend Java/Spring Boot.

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Gera build de produção
pnpm preview          # Preview do build

# Qualidade de Código
pnpm lint             # Roda ESLint
pnpm type-check       # Verifica tipos TypeScript
```

---

## 🎨 Tema e Estilização

- **Paleta de Cores:** Material Design
- **Fonte:** System fonts (Roboto, Segoe UI, etc)
- **CSS Modules:** Para estilos específicos de componentes
- **Material UI sx props:** Para estilos dinâmicos quando necessário

---

## 📝 Próximas Etapas (FASE 5)

- [ ] Integração com backend REST API
- [ ] TanStack Query para gerenciamento de estado do servidor
- [ ] React Router para rotas
- [ ] Variáveis de ambiente para URL da API
- [ ] Autenticação/Autorização (futuro)

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ usando React + TypeScript + Material UI**

