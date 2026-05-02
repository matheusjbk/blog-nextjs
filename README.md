# 📝 TheBlog - Frontend

Uma aplicação web moderna de blog construída com [Next.js](https://nextjs.org) e Tailwind CSS. Oferece funcionalidades completas de gerenciamento de posts, autenticação de usuários e upload de imagens.

## 📋 Características

- ✅ Autenticação segura com JWT
- ✅ Gerenciamento de posts (criar, editar, deletar)
- ✅ Upload e gerenciamento de imagens
- ✅ Sistema de usuários (criação, atualização, gerenciamento de senhas)
- ✅ Interface responsiva com Tailwind CSS
- ✅ Editor de markdown integrado
- ✅ Painel administrativo para gerenciar conteúdo
- ✅ Sistema de notificações (toast messages)
- ✅ Página pública de visualização de posts

## 🛠️ Tecnologias

**Frontend:**

- [Next.js](https://nextjs.org) - Framework React
- [React](https://react.dev) - Biblioteca UI
- [TypeScript](https://www.typescriptlang.org) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com) - Estilização
- [React Markdown](https://github.com/remarkjs/react-markdown) - Renderização de markdown
- [React Toastify](https://fkhadra.github.io/react-toastify) - Notificações
- [Zod](https://zod.dev) - Validação de schemas

**Backend (API):**

- [.NET 10](https://dotnet.microsoft.com/en-us/)
- [SQL Server 2025](https://www.microsoft.com/pt-br/sql-server/)
- JWT para autenticação
- Entity Framework Core para ORM

**DevOps:**

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 📦 Requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Docker** e **Docker Compose** (para executar via containers) - [Instalar Docker](https://docs.docker.com/get-docker/)
- **Node.js** 18+ e **npm** (para desenvolvimento local)
- Portas disponíveis:
  - `3000` - Frontend (Next.js)
  - `5000` - Backend API (.NET)
  - `1433` - Banco de dados (SQL Server)

## 🚀 Como Iniciar

### Passo 1: Inicializar a API Backend

A aplicação frontend depende da API backend estar funcionando. Siga as instruções do repositório da API:

1. Clone o repositório da API:

```bash
git clone https://github.com/matheusjbk/theblog-api.git
cd theblog-api
```

2. Inicie a API usando Docker Compose:

```bash
docker-compose up -d
```

3. Aguarde a inicialização completa (pode levar até 50 segundos):

```bash
docker-compose logs -f
```

4. Verifique se a API está rodando:
   - API Backend: [http://localhost:5000](http://localhost:5000/)
   - Documentação OpenAPI: [http://localhost:5000/openapi/v1.json](http://localhost:5000/openapi/v1.json)

Para mais detalhes sobre a API, consulte a [documentação completa](https://github.com/matheusjbk/theblog-api).

### Passo 2: Criar a rede Docker (primeira vez)

O frontend se conecta à API através de uma rede Docker chamada `theblog-network`. Se você nunca criou essa rede, execute:

```bash
docker network create theblog-network
```

> **Nota:** A API já criará essa rede automaticamente quando iniciada via docker-compose.

### Passo 3: Configurar Variáveis de Ambiente

Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis:

```env
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Passo 4: Inicializar o Frontend

#### Opção A: Usando Docker Compose (Recomendado)

```bash
# Inicie o frontend
docker-compose up -d

# Verifique os logs
docker-compose logs -f frontend
```

O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

#### Opção B: Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── actions/                 # Server actions do Next.js
│   ├── login/              # Ações de autenticação
│   ├── post/               # Ações de posts
│   ├── user/               # Ações de usuários
│   └── upload/             # Ações de upload
├── adapters/               # Adaptadores (ex: toast notifications)
├── app/                    # App directory do Next.js
│   ├── admin/              # Painel administrativo
│   ├── login/              # Página de login
│   ├── post/               # Páginas de posts públicos
│   └── user/               # Páginas de usuário
├── components/             # Componentes React reutilizáveis
│   ├── admin/              # Componentes administrativos
│   └── [outros]            # Componentes gerais
├── lib/                    # Utilitários e schemas
│   ├── login/              # Schemas e lógica de login
│   ├── post/               # Schemas de posts
│   ├── user/               # Schemas de usuários
│   └── queries/            # Queries para API
├── models/                 # Modelos de dados
├── utils/                  # Funções utilitárias
└── public/                 # Arquivos estáticos
    └── uploads/            # Imagens enviadas
```

## 🔐 Autenticação

A aplicação utiliza autenticação JWT com a API. O fluxo é:

1. Usuário faz login na página `/login` com suas credenciais
2. As credenciais são validadas na API
3. Um token JWT é retornado e armazenado
4. O token é incluído em requisições subsequentes para acessar rotas protegidas

## 🌐 Gerenciamento com Docker Compose

### Visualizar logs

```bash
docker-compose logs -f frontend
docker-compose logs -f  # Todos os serviços
```

### Parar os serviços

```bash
docker-compose down
```

### Parar e remover volumes

```bash
docker-compose down -v
```

### Verificar status

```bash
docker-compose ps
```

### Reconstruir a imagem

```bash
docker-compose up -d --build
```

## 🧪 Desenvolvimento

### Executar linter

```bash
npm run lint
```

### Build para produção

```bash
npm run build
npm start
```

## 🆘 Troubleshooting

### Erro de conexão com a API

- Verifique se a API está rodando em `http://localhost:5000`
- Confirme a variável `NEXT_PUBLIC_API_URL` no arquivo `.env`
- Verifique a rede Docker: `docker network ls`

### Erro de autenticação

- Limpe os cookies do navegador
- Verifique se o token JWT está sendo armazenado corretamente
- Consulte os logs da API: `docker-compose logs backend -f` (no diretório da API)

### Porta já em uso

```bash
# Porta 3000 em uso:
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Permissão negada no Docker

- No Windows: Certifique-se de que o Docker Desktop está rodando
- No Linux: `sudo usermod -aG docker $USER` e faça logout/login

---

Desenvolvido com ❤️ usando Next.js
