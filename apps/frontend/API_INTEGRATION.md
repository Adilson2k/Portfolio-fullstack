
# Documentação de Integração API - Portfolio Full Stack

Este documento descreve como integrar o frontend do portfolio com uma API REST utilizando autenticação JWT.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração](#configuração)
3. [Autenticação](#autenticação)
4. [Endpoints da API](#endpoints-da-api)
5. [Tipos TypeScript](#tipos-typescript)
6. [Serviços](#serviços)
7. [Implementação](#implementação)
8. [Tratamento de Erros](#tratamento-de-erros)
9. [Segurança](#segurança)

## 🎯 Visão Geral

O portfolio está estruturado para consumir uma API REST com as seguintes funcionalidades:

- **Autenticação JWT**: Login/logout/registro de usuários
- **Gerenciamento de Projetos**: CRUD completo de projetos
- **Mensagens de Contato**: Recebimento e gerenciamento de mensagens
- **Experiências**: Gerenciamento de experiências profissionais
- **Skills**: Gerenciamento de habilidades e tecnologias
- **Dashboard**: Estatísticas e métricas

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

### Configuração do API Client

O cliente API está configurado em `src/services/api.ts` com:

- Interceptadores automáticos para tokens JWT
- Tratamento de erros centralizado
- Suporte a upload de arquivos
- Refresh automático de tokens

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login**: `POST /auth/login`
2. **Registro**: `POST /auth/register`
3. **Refresh Token**: `POST /auth/refresh`
4. **Logout**: `POST /auth/logout`
5. **Usuário Atual**: `GET /auth/me`

### Exemplo de Uso

```typescript
import { authService } from '../services/api';

// Login
const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const authResponse = await authService.login(credentials);
    console.log('Login successful:', authResponse.user);
    // Token é automaticamente armazenado
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Verificar se está autenticado
const isLoggedIn = authService.isAuthenticated();
```

## 🚀 Endpoints da API

### Autenticação
```
POST   /auth/login          - Login do usuário
POST   /auth/register       - Registro de novo usuário
POST   /auth/logout         - Logout do usuário
GET    /auth/me             - Dados do usuário atual
POST   /auth/refresh        - Renovar token JWT
```

### Projetos
```
GET    /projects            - Listar projetos (com paginação)
GET    /projects/:id        - Obter projeto específico
POST   /projects            - Criar novo projeto
PUT    /projects/:id        - Atualizar projeto
DELETE /projects/:id        - Deletar projeto
POST   /projects/:id/image  - Upload de imagem do projeto
```

### Contato
```
POST   /contact             - Enviar mensagem de contato
GET    /contact             - Listar mensagens (admin)
PUT    /contact/:id/read    - Marcar mensagem como lida
DELETE /contact/:id         - Deletar mensagem
```

### Experiências
```
GET    /experience          - Listar experiências
POST   /experience          - Criar experiência
PUT    /experience/:id      - Atualizar experiência
DELETE /experience/:id      - Deletar experiência
```

### Skills
```
GET    /skills              - Listar skills
POST   /skills              - Criar skill
PUT    /skills/:id          - Atualizar skill
DELETE /skills/:id          - Deletar skill
```

### Dashboard
```
GET    /dashboard/stats     - Estatísticas do dashboard
```

## 📊 Tipos TypeScript

Todos os tipos estão definidos em `src/types/api.ts`:

### Principais Interfaces

```typescript
// Usuário
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

// Projeto
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Resposta da API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
```

## 🛠️ Serviços

### Estrutura dos Serviços

Cada entidade possui seu próprio serviço:

- `authService`: Autenticação e autorização
- `projectService`: Gerenciamento de projetos
- `contactService`: Mensagens de contato
- `experienceService`: Experiências profissionais
- `skillService`: Habilidades e tecnologias
- `dashboardService`: Métricas e estatísticas

### Exemplo de Uso dos Serviços

```typescript
import { projectService } from '../services/api';

// Buscar projetos com filtros
const fetchProjects = async () => {
  try {
    const response = await projectService.getProjects(1, 10, 'fullstack');
    setProjects(response.data);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Criar novo projeto
const createProject = async (projectData: CreateProjectData) => {
  try {
    const newProject = await projectService.createProject(projectData);
    console.log('Project created:', newProject);
  } catch (error) {
    console.error('Error creating project:', error);
  }
};
```

## 🎯 Implementação

### 1. Conectar com React Query (Recomendado)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/api';

// Hook para buscar projetos
export const useProjects = (page = 1, category = 'all') => {
  return useQuery({
    queryKey: ['projects', page, category],
    queryFn: () => projectService.getProjects(page, 10, category),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para criar projeto
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
```

### 2. Implementar no Componente

```typescript
import { useProjects, useCreateProject } from '../hooks/useProjects';

const ProjectsPage = () => {
  const { data: projects, isLoading, error } = useProjects(1, 'all');
  const createProject = useCreateProject();

  const handleCreateProject = (projectData: CreateProjectData) => {
    createProject.mutate(projectData);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar projetos</div>;

  return (
    <div>
      {projects?.data.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

## ❌ Tratamento de Erros

### Interceptador de Erros

O cliente API possui tratamento automático de erros:

```typescript
// Erros são automaticamente capturados e formatados
try {
  const response = await apiService.someEndpoint();
} catch (error: ApiError) {
  // Error possui: message, status, field (opcional)
  console.error(error.message);
  
  if (error.status === 401) {
    // Redirect para login
    authService.logout();
  }
}
```

### Tratamento Global com React Query

```typescript
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});
```

## 🔒 Segurança

### Boas Práticas Implementadas

1. **Token JWT**: Armazenado no localStorage com renovação automática
2. **Interceptadores**: Adição automática do token em todas as requisições
3. **Validação**: Tipos TypeScript para validação em tempo de compilação
4. **CORS**: Configuração adequada no backend
5. **HTTPS**: Uso obrigatório em produção

### Headers de Segurança

```typescript
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'X-Requested-With': 'XMLHttpRequest',
};
```

### Refresh Token

```typescript
// Renovação automática do token antes da expiração
const scheduleTokenRefresh = (expiresIn: number) => {
  const refreshTime = (expiresIn - 60) * 1000; // 1 minuto antes
  setTimeout(async () => {
    try {
      await authService.refreshToken();
    } catch (error) {
      authService.logout(); // Force logout se falhar
    }
  }, refreshTime);
};
```

## 📝 Exemplo Completo de Backend (Node.js/Express)

### Estrutura Sugerida

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── projects.js
│   └── app.js
├── package.json
└── .env
```

### Middleware de Autenticação

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

## 🚀 Deploy e Produção

### Variáveis de Ambiente de Produção

```env
REACT_APP_API_URL=https://api.seudominio.com/api
REACT_APP_ENVIRONMENT=production
```

### Build para Produção

```bash
npm run build
```

O portfolio está otimizado para deploy em:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

---

## 📞 Suporte

Para dúvidas ou problemas na integração:

- 📧 Email: joao.silva@email.com
- 📱 WhatsApp: +55 (11) 99999-9999
- 🐙 GitHub: @joaosilva

---

**Última atualização**: Dezembro 2024
**Versão**: 1.0.0
```
