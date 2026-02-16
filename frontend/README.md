# Frontend - Asset Management

Interface web para gerenciamento de ativos.

## Stack

- React 19
- TypeScript
- Vite
- Material UI
- React Hook Form + Zod (validação)
- Axios

## Como Rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev
# Acesse: http://localhost:5173

# Build produção
npm run build
npm run preview
```

## Com Docker

```bash
docker build -t asset-frontend .
docker run -d -p 8080:80 asset-frontend
# Acesse: http://localhost:8080
```

## Estrutura

```
src/
├── components/     # Componentes reutilizáveis
│   ├── AssetTable.tsx
│   ├── AssetFilters.tsx
│   ├── AssetForm.tsx
│   └── ConfirmDialog.tsx
├── pages/         # Páginas
│   └── Dashboard.tsx
├── services/      # API calls
│   └── assetService.ts
├── types/         # TypeScript types
│   └── asset.ts
└── theme/         # Tema MUI
    └── theme.ts
```

## Funcionalidades

- CRUD completo de ativos
- Filtros (busca, categoria, status)
- Validação com React Hook Form + Zod
- Feedback visual (loading, erros, sucesso)
- Interface responsiva

## Configuração

Criar arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## Scripts

```bash
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run preview    # Preview build
npm run lint       # ESLint
```
