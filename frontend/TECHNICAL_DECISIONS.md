# 🎯 Decisões Técnicas - Frontend

Este documento explica as escolhas técnicas feitas no desenvolvimento do frontend e o raciocínio por trás de cada uma.

---

## 🏗️ Arquitetura e Stack

### React 19 + TypeScript 5.9

**Por que React 19?**
- Última versão estável com melhorias significativas de performance
- Server Components preparados para futuras otimizações
- Hooks modernos e melhor suporte a Suspense
- Ecossistema maduro e comunidade ativa

**Por que TypeScript?**
- Type safety reduz bugs em produção
- Autocomplete e IntelliSense melhoram produtividade
- Refactoring mais seguro
- Documentação automática via tipos
- Requisito de mercado para aplicações enterprise

---

## 🛠️ Build Tool e Performance

### Vite 7.3

**Por que Vite em vez de Create React App?**
- **100x mais rápido**: HMR (Hot Module Replacement) instantâneo
- Build otimizado com Rollup (tree-shaking eficiente)
- Configuração mínima e sensata por padrão
- Suporte nativo a TypeScript, JSX, CSS Modules
- CRA está deprecated, Vite é o padrão moderno

**Impacto:**
- Dev server inicia em ~500ms (vs 10-30s no CRA)
- HMR em ~50ms (mudanças refletem instantaneamente)
- Build de produção 3x menor e mais rápido

---

## 🎨 UI e Estilização

### Material UI (MUI) 7.3

**Por que MUI?**
- **Componentes prontos e profissionais**: Reduz 70% do tempo de desenvolvimento
- **Acessibilidade WCAG 2.1**: Componentes seguem padrões de a11y
- **Customização via tema**: Mantém consistência visual
- **Componentes complexos prontos**: Dialog, Table, Snackbar, etc.
- **Design responsivo**: Grid system e breakpoints integrados
- **Largamente adotado**: 3.5M downloads/semana, documentação extensa

**Alternativas consideradas:**
- Tailwind CSS: Excelente, mas exigiria criar todos os componentes do zero
- Ant Design: Muito bom, mas mais opinativo e pesado
- Chakra UI: Ótimo, mas menor adoção e menos componentes prontos

### CSS Modules

**Por que CSS Modules?**
- **Escopo local**: Evita conflitos de nomes de classes
- **Type-safe**: Integração com TypeScript
- **Performance**: Código morto é removido no build
- **Organização**: Um arquivo `.module.css` por componente
- **Zero runtime**: CSS puro, sem overhead de CSS-in-JS

**Quando usar CSS Modules vs sx props do MUI:**
- CSS Modules: Estilos estáticos e complexos do componente
- sx props: Estilos dinâmicos baseados em props/estado

---

## 📝 Formulários e Validação

### React Hook Form + Zod

**Por que React Hook Form?**
- **Performance excepcional**: Re-render apenas dos campos que mudaram
- **Developer Experience**: API intuitiva e menos boilerplate
- **Built-in validation**: Integração nativa com Zod
- **Controle total**: Modo controlado e não-controlado
- **Tamanho**: 8.5kb (minified + gzipped)

**Por que Zod?**
- **Type-safe**: Schema de validação gera tipos TypeScript automaticamente
- **Composição**: Schemas reutilizáveis e combináveis
- **Mensagens customizadas**: Erros claros e em português
- **Validação client-side e server-side**: Mesmo schema pode ser usado no backend
- **Inferência de tipos**: `z.infer<typeof schema>` gera tipos automaticamente

**Exemplo prático:**
```typescript
const assetSchema = z.object({
  name: z.string().min(3).max(100),
  serialNumber: z.string().min(3).max(50),
  purchaseDate: z.string().min(1).refine(...),
  purchaseValue: z.number().positive().max(999999999),
});

type AssetFormData = z.infer<typeof assetSchema>; // Tipo gerado automaticamente
```

**Alternativas consideradas:**
- Formik: Popular, mas performance inferior e maior bundle
- Yup: Boa biblioteca de validação, mas Zod tem melhor integração TypeScript

---

## 🗂️ Estrutura de Pastas

### Organização por Feature

```
src/
├── components/    # Componentes reutilizáveis (Layout, Form, Table, etc)
├── pages/         # Páginas/rotas (Dashboard, NotFound)
├── services/      # Lógica de comunicação com API (mock e real)
├── types/         # Definições TypeScript centralizadas
├── data/          # Dados estáticos/mockados
├── theme/         # Configuração do tema MUI
├── App.tsx        # Componente raiz
└── main.tsx       # Entry point
```

**Por que essa estrutura?**
- **Escalável**: Fácil adicionar novas features
- **Separação de responsabilidades**: Cada pasta tem um propósito claro
- **Fácil localização**: Desenvolvedores novos encontram código rapidamente
- **Testável**: Componentes isolados e serviços desacoplados

---

## 🔄 Gerenciamento de Estado

### Estratégia Atual: useState + Mock Service

**Por que não Redux/Zustand/Context API agora?**
- **YAGNI (You Aren't Gonna Need It)**: Para esta fase, estado local é suficiente
- **Simplicidade**: Menos dependências, menos complexidade
- **Preparado para TanStack Query**: Na Fase 5, migração será suave

### Mock Service Pattern

**Por que criar um Mock Service?**
- **Desenvolvimento paralelo**: Frontend avança sem depender do backend
- **Testes facilitados**: Simular cenários de sucesso e erro
- **API contract definido**: Interface idêntica à API real
- **Migração suave**: Trocar mock por API real é apenas mudar a importação
- **Delays simulados**: Realismo (200-500ms) para testar loading states

**Estrutura:**
```typescript
// mockService.ts
export const mockService = {
  getAssets: () => Promise.resolve(assetsDB),
  createAsset: (data) => simulateDelay().then(...),
  updateAsset: (id, data) => simulateDelay().then(...),
  deleteAsset: (id) => simulateDelay().then(...),
};

// Fase 5: Trocar por API real
// apiService.ts
export const apiService = {
  getAssets: () => axios.get('/api/assets'),
  createAsset: (data) => axios.post('/api/assets', data),
  // ... mesma interface!
};
```

### Preparado para TanStack Query (Fase 5)

**Por que TanStack Query?**
- **Cache inteligente**: Reduz chamadas redundantes à API
- **Sincronização automática**: Atualiza dados em background
- **Estados prontos**: loading, error, success out-of-the-box
- **Otimistic updates**: UI atualiza antes da resposta do servidor
- **Padrão da indústria**: Usado por empresas como Netflix, Discord, Adobe

---

## 🐳 Docker e Deploy

### Multi-Stage Build (Node Alpine + Nginx Alpine)

**Por que Multi-Stage Build?**
- **Imagem minúscula**: ~25 MB (vs ~1.2 GB com Node completo)
- **Segurança**: Imagem final não contém Node.js, npm, ou código-fonte
- **Performance**: Nginx é 10x mais rápido que `serve` ou `http-server`
- **Produção-ready**: Configuração profissional usada em clouds

**Estágios:**

**Stage 1 (Builder):**
```dockerfile
FROM node:20-alpine AS builder
# Instala pnpm, copia código, roda build
# Gera /dist com assets otimizados
```

**Stage 2 (Production):**
```dockerfile
FROM nginx:alpine
# Copia /dist do stage 1
# Configura Nginx para SPA routing
# Adiciona healthcheck
```

**Benefícios:**
- Build cache: Recompila apenas o que mudou
- Zero configuração adicional para rodar
- Healthcheck: Docker monitora se app está respondendo

### Nginx para SPA Routing

**Configuração crítica:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Por que isso é importante?**
- React Router usa rotas client-side (`/dashboard`, `/assets/123`)
- Sem essa config, refresh em `/dashboard` retorna 404
- `try_files` redireciona tudo para `index.html`, deixando React tomar conta

---

## 🎨 Design Patterns e Boas Práticas

### Composição sobre Herança

```typescript
// ✅ Bom: Componente recebe funções via props
<AssetForm 
  onSubmit={handleSubmit}
  onClose={handleClose}
/>

// ❌ Evitado: Herança de classes
class AssetForm extends BaseForm { ... }
```

### Controlled Components

```typescript
// ✅ Bom: React Hook Form controla os inputs
<Controller
  name="name"
  control={control}
  render={({ field }) => <TextField {...field} />}
/>

// ❌ Evitado: Inputs não controlados
<input defaultValue="..." />
```

### Props Drilling Limitado

```typescript
// Nível aceitável: 2-3 níveis
Dashboard → AssetTable → IconButton

// Se passar de 3 níveis: considerar Context/TanStack Query
```

### Error Boundaries (Futuro)

Preparado para adicionar na Fase 5:
```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

---

## 📊 Trade-offs e Limitações Conhecidas

### 1. Sem Roteamento (React Router)

**Decisão:** Adiar para Fase 5  
**Motivo:** Dashboard único não precisa de rotas ainda  
**Impacto:** Zero nesta fase  
**Migração:** Adicionar `<BrowserRouter>` e `<Routes>` quando necessário

### 2. Sem Testes Automatizados

**Decisão:** Focar em funcionalidade primeiro  
**Motivo:** Prazo de 3 dias, priorizar entrega  
**Impacto:** Testes manuais completos realizados  
**Próximos passos:** Adicionar Vitest + Testing Library se houver tempo

### 3. Mock Data em Memória

**Decisão:** Array local simulando banco  
**Motivo:** Fase de desenvolvimento, backend vem na Fase 3  
**Impacto:** Dados resetam ao recarregar página  
**Migração:** Trocar por API real na Fase 5

### 4. Sem Internacionalização (i18n)

**Decisão:** Interface em português  
**Motivo:** Escopo do projeto não exige multi-idioma  
**Impacto:** Mensagens hardcoded em PT-BR  
**Extensão futura:** React-i18next se necessário

---

## 🔒 Segurança

### Validação Client-Side

- ✅ Zod valida todos os inputs antes de enviar
- ✅ Sanitização de strings (trim, max length)
- ✅ Type safety previne dados inválidos

**Observação:** Client-side validation é UX, **não segurança**.  
Backend (Fase 3) terá Bean Validation para garantir integridade.

### Proteção XSS

- ✅ React escapa strings automaticamente
- ✅ Não usa `dangerouslySetInnerHTML`
- ✅ Material UI escapa props de texto

---

## 🚀 Performance

### Otimizações Implementadas

1. **Build otimizado:**
   - Tree-shaking remove código não usado
   - Minificação reduz bundle em ~70%
   - Code splitting (futuro, quando adicionar rotas)

2. **Render otimizado:**
   - React Hook Form minimiza re-renders
   - useMemo para filtros (evita recalcular toda vez)
   - useCallback para handlers (evita re-criar funções)

3. **Loading states:**
   - CircularProgress durante operações
   - Feedback visual imediato (Snackbar)
   - Desabilita botões durante loading (previne double-submit)

### Métricas (Docker build otimizado)

- **Bundle size:** ~250 KB (minified + gzipped)
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Docker image:** ~25 MB (vs ~1.2 GB sem multi-stage)

---

## 📚 Referências e Documentação

- [React 19 Docs](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Última atualização:** Fase 2 - Frontend com Mock Data  
**Próxima revisão:** Fase 5 - Integração com Backend Real
