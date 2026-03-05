# Frontend - Asset Management

Interface web para gerenciamento de ativos empresariais.

## Stack

- React 19, TypeScript, Vite
- Material UI (componentes de UI)
- React Hook Form + Zod (validação de formulários)
- TanStack Query (cache e estado de servidor)
- Fetch nativo (requisições HTTP)

## Como Rodar

```bash
npm install
npm run dev
# http://localhost:5173
```

## Configuração

Criar arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:8080
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # ESLint
```

## Estrutura

```
src/
├── components/
│   ├── AssetTable.tsx       # Tabela de ativos
│   ├── AssetFilters.tsx     # Filtros de busca
│   ├── AssetForm.tsx        # Formulário criação/edição
│   ├── ConfirmDialog.tsx    # Diálogo de confirmação
│   └── Layout.tsx           # Layout base
├── pages/
│   └── Dashboard.tsx        # Página principal (paginação e filtros server-side)
├── services/
│   └── assetService.ts      # Chamadas à API
├── types/
│   └── asset.ts             # Tipos TypeScript
└── theme/
    └── theme.ts             # Tema Material UI
```

## Validações (Zod)

| Campo | Regra |
|-------|-------|
| name | Obrigatório, 3-100 caracteres |
| serialNumber | Obrigatório, 3-50 caracteres |
| category | Obrigatório |
| status | Obrigatório |
| purchaseDate | Obrigatório, formato válido |
| purchaseValue | Opcional, >= 0, máx 999.999.999 |
| location | Opcional, máx 200 caracteres |
| description | Opcional, máx 500 caracteres |

## Docker

```bash
docker build -t asset-frontend .
docker run -p 80:80 asset-frontend
# http://localhost:80
```
