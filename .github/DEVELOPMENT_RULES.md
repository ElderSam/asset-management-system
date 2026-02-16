# 🛠️ Regras de Desenvolvimento

Este arquivo contém regras obrigatórias para desenvolvimento com GitHub Copilot/Claude.

## 🎯 STACK PERMITIDA

### Frontend
✅ **USAR:**
- React 19 + TypeScript
- Vite
- Material UI (MUI)
- TanStack Query (React Query)
- React Hook Form + Zod
- Axios
- React Router DOM
- date-fns

❌ **NÃO USAR:**
- TailwindCSS (usar MUI)
- shadcn/ui (usar MUI)
- Zustand (usar TanStack Query)
- Redux (usar TanStack Query)
- styled-components (usar MUI sx prop ou emotion)

### Backend
✅ **USAR:**
- Java 21
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Bean Validation
- Lombok
- Maven

---

## 📐 PADRÕES DE CÓDIGO

### **Frontend (React + TypeScript)**

#### 1. Componentes
```typescript
// ✅ CORRETO - Functional Component com TypeScript
interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
}

export const AssetTable: React.FC<AssetTableProps> = ({ assets, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      {/* ... */}
    </TableContainer>
  );
};

// ❌ ERRADO - Sem tipos
export const AssetTable = ({ assets, onEdit }) => { ... }
```

#### 2. Hooks Personalizados
```typescript
// ✅ CORRETO - Hook com TanStack Query
export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  });
};
```

#### 3. Validação com Zod
```typescript
// ✅ CORRETO - Schema Zod
import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  serialNumber: z.string().min(1, 'Número de série obrigatório'),
  category: z.enum(['computer', 'monitor', 'peripheral', 'network', 'other']),
  value: z.number().positive('Valor deve ser positivo'),
});

export type AssetFormData = z.infer<typeof assetSchema>;
```

#### 4. Formulários com React Hook Form
```typescript
// ✅ CORRETO - Integração completa
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<AssetFormData>({
  resolver: zodResolver(assetSchema),
});
```

#### 5. Estilização com MUI
```typescript
// ✅ CORRETO - Usar sx prop
<Box
  sx={{
    display: 'flex',
    gap: 2,
    p: 3,
  }}
>
  {/* ... */}
</Box>

// ❌ ERRADO - Não usar classes Tailwind
<div className="flex gap-2 p-3">
```

---

### **Backend (Java + Spring Boot)**

#### 1. Estrutura de Pacotes
```
com.assetmanagement
├── config/          # Configurações (CORS, etc)
├── controller/      # REST Controllers
├── dto/             # Data Transfer Objects
├── model/           # Entidades JPA
├── repository/      # Spring Data Repositories
├── service/         # Lógica de negócio
└── exception/       # Exception handlers
```

#### 2. Entidades JPA
```java
// ✅ CORRETO - Entidade completa
@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres")
    private String name;

    @NotBlank(message = "Número de série é obrigatório")
    @Column(unique = true)
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    private AssetCategory category;

    // ... outros campos
}
```

#### 3. Controllers REST
```java
// ✅ CORRETO - Controller com validação
@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {
    
    @Autowired
    private AssetService assetService;

    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAllAssets() {
        return ResponseEntity.ok(assetService.findAll());
    }

    @PostMapping
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(assetService.create(dto));
    }
}
```

#### 4. DTOs (Data Transfer Objects)
```java
// ✅ CORRETO - DTO com validação
@Data
public class AssetDTO {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Número de série é obrigatório")
    private String serialNumber;

    @NotNull(message = "Categoria é obrigatória")
    private AssetCategory category;

    @NotNull(message = "Status é obrigatório")
    private AssetStatus status;

    // ... outros campos
}
```

---

## 📝 CONVENÇÕES DE NOMENCLATURA

### Frontend
- **Componentes:** PascalCase (`AssetTable.tsx`)
- **Hooks:** camelCase com prefixo `use` (`useAssets.ts`)
- **Types:** PascalCase (`Asset`, `AssetFormData`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Funções:** camelCase (`fetchAssets`)

### Backend
- **Classes:** PascalCase (`AssetService`)
- **Métodos:** camelCase (`findAll`, `createAsset`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`)
- **Pacotes:** lowercase (`com.assetmanagement.service`)

---

## 🚨 TRATAMENTO DE ERROS

### Frontend
```typescript
// ✅ CORRETO - Try-catch com mensagem ao usuário
const { mutate, isPending } = useMutation({
  mutationFn: createAsset,
  onSuccess: () => {
    toast.success('Ativo criado com sucesso!');
    queryClient.invalidateQueries({ queryKey: ['assets'] });
  },
  onError: (error) => {
    toast.error('Erro ao criar ativo. Tente novamente.');
    console.error(error);
  },
});
```

### Backend
```java
// ✅ CORRETO - Exception handler global
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

---

## ✅ COMMITS CONVENCIONAIS
```bash
# ✅ CORRETO
git commit -m "feat: add asset creation form with validation"
git commit -m "fix: correct date formatting in asset table"
git commit -m "docs: update README with deployment instructions"

# ❌ ERRADO
git commit -m "updated code"
git commit -m "fix bug"
```

**Prefixos:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (não afeta lógica)
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

---

## 🔒 SEGURANÇA

### Frontend
```typescript
// ✅ CORRETO - Variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// ❌ ERRADO - Hardcoded
const API_URL = 'http://localhost:8080';
```

### Backend
```properties
# ✅ CORRETO - Variáveis de ambiente
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/assetdb}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD:postgres}
```

---

## 📱 RESPONSIVIDADE (Frontend)
```typescript
// ✅ CORRETO - Usar Grid/Container do MUI
<Container maxWidth="lg">
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      {/* Conteúdo */}
    </Grid>
  </Grid>
</Container>

// ❌ ERRADO - Media queries manuais
<div style={{ width: window.innerWidth > 768 ? '50%' : '100%' }}>
```

---

## 🎨 TEMA (Frontend)
```typescript
// ✅ CORRETO - Usar tema MUI
<Button variant="contained" color="primary">
  Salvar
</Button>

// ❌ ERRADO - Cores hardcoded
<Button style={{ backgroundColor: '#1976d2' }}>
```

---

## ⚡ PERFORMANCE

### Frontend
- ✅ Usar `React.memo` para componentes pesados
- ✅ Lazy loading com `React.lazy`
- ✅ TanStack Query para cache automático

### Backend
- ✅ Paginação para listas grandes
- ✅ Índices no banco de dados
- ✅ DTOs para evitar over-fetching

---

## 🧪 TESTES (Futuro)
```typescript
// Frontend - Vitest
describe('AssetTable', () => {
  it('should render assets correctly', () => {
    // ...
  });
});
```
```java
// Backend - JUnit
@Test
void shouldCreateAssetSuccessfully() {
    // ...
}
```