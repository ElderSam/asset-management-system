# 🚀 Stack Tecnológica - Asset Management System

Este documento detalha todas as tecnologias utilizadas no projeto e as justificativas de cada escolha.

---

## 📱 FRONTEND

### **Core**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 19.0.0 | Framework mais popular para SPAs, excelente ecossistema |
| **TypeScript** | 5.3+ | Type safety, melhor DX, menos bugs em produção |
| **Vite** | 5.0+ | Build tool moderno, HMR instantâneo, melhor que CRA |

### **UI Framework**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Material UI (MUI)** | 5.15+ | Componentes prontos e acessíveis, responsivo, tema configurável |
| **@mui/icons-material** | 5.15+ | Ícones consistentes com o design system |
| **@emotion/react** | 11.11+ | Estilização CSS-in-JS (dependência do MUI) |
| **@emotion/styled** | 11.11+ | Componentes estilizados (dependência do MUI) |

**Por que MUI e não Tailwind?**
- ✅ Componentes complexos prontos (Table, Dialog, Autocomplete)
- ✅ Validação visual integrada (FormHelperText, error states)
- ✅ Tema global configurável
- ✅ Responsividade automática (Grid, Container)
- ✅ Acelera desenvolvimento (projeto de 3 dias)

### **Gerenciamento de Estado**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **TanStack Query** | 5.0+ | Gerencia estado do servidor (cache, loading, error, refetch) |
| **@tanstack/react-query-devtools** | 5.0+ | DevTools para debugar queries |

**Por que TanStack Query e não Redux/Zustand?**
- ✅ Elimina boilerplate de loading/error states
- ✅ Cache automático e inteligente
- ✅ Refetch em background
- ✅ Otimistic updates
- ✅ Substitui 90% da necessidade de estado global

### **Formulários e Validação**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React Hook Form** | 7.51+ | Performance superior, menos re-renders |
| **Zod** | 3.22+ | Validação type-safe, melhor DX que Yup/Joi |
| **@hookform/resolvers** | 3.3+ | Integração RHF + Zod |

**Por que Zod?**
- ✅ Type inference automática (`z.infer<typeof schema>`)
- ✅ Mensagens de erro customizáveis
- ✅ Validação síncrona e assíncrona
- ✅ Runtime validation + compile-time types

### **HTTP Client**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Axios** | 1.6+ | Interceptors, cancelamento de requisições, melhor que fetch |

### **Roteamento**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React Router DOM** | 6.22+ | Roteamento client-side, navegação declarativa |

### **Utilitários**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **date-fns** | 3.3+ | Manipulação de datas (menor que moment.js, funcional) |

---

## 🔧 BACKEND

### **Core**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Java** | 25 | Versão mais recente, recursos modernos |
| **Spring Boot** | 3.2+ | Framework enterprise padrão, produtividade |
| **Maven** | 3.9+ | Gerenciamento de dependências |

### **Persistência**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Spring Data JPA** | 3.2+ | Abstração sobre JPA, repositories automáticos |
| **Hibernate** | 6.4+ | Implementação JPA padrão |
| **PostgreSQL** | 16+ | Banco relacional robusto, open-source |
| **PostgreSQL Driver** | 42.7+ | Driver JDBC oficial |

### **Validação**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Bean Validation (Jakarta)** | 3.0+ | Validação declarativa com anotações |
| **Hibernate Validator** | 8.0+ | Implementação de Bean Validation |

### **Utilitários**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Lombok** | 1.18+ | Reduz boilerplate (@Data, @Builder, etc) |

### **Documentação API (Opcional)**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **SpringDoc OpenAPI** | 2.3+ | Gera documentação Swagger automática |

---

## 🐳 DEVOPS

### **Containerização**

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Docker** | 24+ | Ambiente consistente, isolamento |
| **Docker Compose** | 2.24+ | Orquestração multi-container |

### **Deploy**

| Serviço | Para | Justificativa |
|---------|------|---------------|
| **Vercel** | Frontend | Deploy automático, CDN global, zero-config |
| **Netlify** | Frontend (alternativa) | Similar ao Vercel, excelente DX |
| **Render** | Backend + DB | Free tier generoso, PostgreSQL incluído |
| **Railway** | Backend + DB (alternativa) | Simples, bom free tier |

---

## ❌ TECNOLOGIAS QUE NÃO USAMOS

### Frontend

| Tecnologia | Por que NÃO |
|------------|-------------|
| **TailwindCSS** | MUI já fornece estilização completa |
| **shadcn/ui** | MUI é mais completo para este projeto |
| **Zustand** | TanStack Query gerencia estado do servidor |
| **Redux** | Overkill para este projeto, TanStack Query suficiente |
| **styled-components** | MUI usa Emotion (menos dependências) |
| **Yup** | Zod tem melhor type inference |
| **Joi** | Focado em backend, Zod melhor para frontend |

### Backend

| Tecnologia | Por que NÃO |
|------------|-------------|
| **MySQL** | PostgreSQL mais robusto e moderno |
| **MongoDB** | Projeto relacional (assets têm schema fixo) |
| **H2** | Apenas para dev, produção precisa PostgreSQL |

---

## 📦 DEPENDÊNCIAS COMPLETAS

### **Frontend (package.json)**

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.0",
    "date-fns": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^20.11.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### **Backend (pom.xml) - Principais**

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- SpringDoc OpenAPI (Swagger) -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
</dependencies>
```

---

## 🎯 DECISÕES TÉCNICAS PRINCIPAIS

### 1. **Por que React 19?**
- Versão mais recente (fevereiro 2026)
- Melhorias de performance
- Novos hooks e features

### 2. **Por que Material UI?**
- Componentes prontos aceleram desenvolvimento
- Projeto tem apenas 3 dias
- UI profissional sem esforço de design
- Muito usado no mercado (demonstra experiência)

### 3. **Por que TanStack Query?**
- Elimina necessidade de Redux/Zustand para dados do servidor
- Cache inteligente
- Refetch automático
- Loading/error states automáticos

### 4. **Por que Zod em vez de Yup?**
- Type inference automática (menos código duplicado)
- Melhor integração com TypeScript
- Performance superior
- Comunidade ativa

### 5. **Por que PostgreSQL?**
- Banco relacional robusto
- Suporte a JSON (flexibilidade futura)
- Open-source
- Compatível com todos os serviços de deploy

### 6. **Por que Java 25?**
- Versão mais recente
- Features modernas (pattern matching, records, etc)
- Demonstra conhecimento atualizado

### 7. **Por que Vite em vez de Create React App?**
- CRA está deprecated
- Vite é 10-100x mais rápido
- Melhor suporte a módulos ES
- Configuração mínima

---

## 📊 COMPARAÇÃO DE ALTERNATIVAS

### Estado Global: TanStack Query vs Redux vs Zustand

| Aspecto | TanStack Query | Redux | Zustand |
|---------|---------------|-------|---------|
| **Curva aprendizagem** | Baixa | Alta | Baixa |
| **Boilerplate** | Mínimo | Alto | Baixo |
| **Cache servidor** | ✅ Built-in | ❌ Manual | ❌ Manual |
| **Loading states** | ✅ Automático | ❌ Manual | ❌ Manual |
| **Refetch** | ✅ Automático | ❌ Manual | ❌ Manual |
| **DevTools** | ✅ Excelente | ✅ Bom | ⚠️ Básico |
| **Ideal para** | Dados servidor | Apps grandes | Estado UI simples |

**Escolha:** TanStack Query (90% dos casos) + Zustand (se precisar estado UI global)

### Validação: Zod vs Yup vs Joi

| Aspecto | Zod | Yup | Joi |
|---------|-----|-----|-----|
| **Type inference** | ✅ Excelente | ⚠️ Parcial | ❌ Não |
| **TypeScript** | ✅ Nativo | ⚠️ Addon | ❌ Fraco |
| **Performance** | ✅ Rápido | ⚠️ Médio | ⚠️ Médio |
| **Bundle size** | ✅ 12kb | ⚠️ 15kb | ❌ 145kb |
| **Uso** | Frontend/Backend | Frontend | Backend |

**Escolha:** Zod (melhor DX com TypeScript)

---

## 🔄 POSSÍVEIS EVOLUÇÕES FUTURAS

### Frontend
- [ ] React Query Persistence (cache em localStorage)
- [ ] PWA (Service Workers)
- [ ] i18n (internacionalização)
- [ ] Testes (Vitest + React Testing Library)
- [ ] Storybook (documentação de componentes)

### Backend
- [ ] Spring Security (autenticação/autorização)
- [ ] Testes (JUnit + Mockito)
- [ ] Migrations (Flyway/Liquibase)
- [ ] Observabilidade (Actuator + Prometheus)
- [ ] Rate Limiting

### DevOps
- [ ] CI/CD (GitHub Actions)
- [ ] Monitoramento (Sentry)
- [ ] Logs estruturados (ELK)

---

**Última atualização:** Fevereiro 2026
