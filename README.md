# AeroControl – Sistema de Gestão de Frotas Aéreas

## 📋 Visão Geral

**AeroControl** se trata de um sistema que permite o gerenciamento completo de aeronaves (CRUD), busca com múltiplos critérios, geração de relatórios estatísticos, autenticação JWT com controle de permissões (ADMIN / USER), upload de imagens para AWS S3 e uma interface web responsiva construída com React.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17** + **Spring Boot 4.0.6**
- **Spring Security** + **JWT** (autenticação e autorização)
- **Spring Data JPA** + **Hibernate** (persistência)
- **PostgreSQL** (banco de dados relacional)
- **AWS SDK v2** (integração com S3 para upload de imagens)
- **Lombok** (redução de código boilerplate)
- **SpringDoc OpenAPI** (documentação Swagger)
- **Maven** (gerenciamento de dependências e build)

### Frontend
- **React 19** + **Vite** (bundler rápido)
- **React Router DOM** (roteamento)
- **Axios** (requisições HTTP)
- **CSS Modules** (estilização escopada)
- **React Icons** (ícones para ações)

### Infraestrutura e Diferenciais
- **Docker** + **Docker Compose** (containerização completa: PostgreSQL, backend, frontend)
- **Swagger UI** (documentação interativa da API)
- **Tratamento global de exceções** e validações customizadas (ICAO, autonomia, duplicidade)
- **Feedback visual** (toasts, loading, botão de tentar novamente)

## 🧱 Arquitetura do Projeto

### Backend (Arquitetura em Camadas)
A API foi estruturada em camadas, seguindo boas práticas do Spring Boot:

- **Controller** – endpoints REST, validação de entrada, retorno de DTOs.
- **Service** – regras de negócio (cálculo de autonomia, normalização de marcas, verificação de duplicidade, relatórios).
- **Repository** – interface JPA para acesso ao banco de dados.
- **Entity** – mapeamento JPA das tabelas (`Aircraft`, `User`).
- **DTO** – objetos de transferência separando a API da entidade.
- **Security** – filtro JWT, configuração de CORS, roles.
- **Exception Handler** – `@ControllerAdvice` para padronizar respostas de erro.

### Frontend (Arquitetura Baseada em Features)
O frontend foi organizado por domínios (features), promovendo alta coesão e manutenibilidade:

- **`features/auth`** – telas de login, registro e serviços de autenticação.
- **`features/fleet`** – gerenciamento de aeronaves (listagem, formulários, tabela, modais, upload).
- **`features/reports`** – página de relatórios com gráficos e tabela.
- **`components`** – componentes comuns (toast, paginação, layout, sidebar).

### Containerização (Docker)
Todos os serviços são definidos e executados em conjunto utilizando `docker-compose.yml`:
- **PostgreSQL** (banco de dados)
- **Backend** (Spring Boot, perfil `s3` ativado)
- **Frontend** (servido por Nginx, configurado para SPA)

A comunicação entre frontend e backend é feita através do host localhost:8080 (para acesso pelo navegador).

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Docker** e **Docker Compose** instalados (recomendado)
- Ou **Java 17**, **Maven**, **Node.js 20+** e **PostgreSQL** local (opcional)

### Execução com Docker (recomendada)
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sonda-aircraft-management.git
   cd sonda-aircraft-management
2. Configure as variáveis de ambiente (credenciais AWS) no arquivo docker-compose.yml ou crie um arquivo .env na raiz:
   ```bash
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...   
3. Execute os containers:
   ```bash
    docker-compose up --build
4. Acesse:
- Frontend: http://localhost:5173 (porta configurada)
- Backend Swagger: http://localhost:8080/swagger-ui.html

### Execução manual (sem Docker)

#### Backend
1. Configure o banco PostgreSQL (crie o banco aircraft_db).
2. Ajuste o application.properties com suas credenciais de banco e AWS.
3. Execute:
   ```bash
   cd aircraft-management-api
   ./mvnw spring-boot:run
   
#### Frontend
1. Instale as dependências:
   ```bash
   cd aircraft-management-spa
   npm install
2. Execute em modo desenvolvimento:
   ```bash
   npm run dev

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|--------------|
| `DB_URL` | URL do PostgreSQL (`jdbc:postgresql://postgres:5432/aircraft_db`) | Sim (Docker) |
| `DB_USER` | Usuário do banco | Sim |
| `DB_PASSWORD` | Senha do banco | Sim |
| `JWT_SECRET` | Chave para assinatura do JWT | Não (valor padrão) |
| `AWS_ACCESS_KEY_ID` | Chave de acesso AWS para S3 | Sim (para upload) |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta AWS | Sim (para upload) |
| `AWS_REGION` | Região do bucket S3 | Sim |
| `AWS_S3_BUCKET` | Nome do bucket S3 | Sim |
| `SPRING_PROFILES_ACTIVE` | `s3` (uso real) | Sim |

No ambiente Docker, as variáveis são definidas diretamente no `docker-compose.yml` ou via arquivo `.env`.

## ⚙️ Decisões Técnicas

1. Backend: Java 17 + Spring Boot, JWT com roles, upload S3 com presigned URLs, perfis local/s3, Docker multi-stage.
2. Frontend: React + Vite, arquitetura por features, CSS Modules, Axios com interceptor JWT, feedback visual (toasts/loading).
3. Banco: PostgreSQL, coluna image_url como TEXT para suportar URLs longas.
4. Segurança: Autenticação JWT, normalização de nomes de fabricantes no backend.
5. Docker: Compose com três serviços (PostgreSQL, backend, frontend – servido via Nginx).

## 📈 Melhorias Futuras

1. Implementar paginação server‑side na listagem de aeronaves.
2. Adicionar refresh token para aumentar a segurança da autenticação.
3. Migrar o frontend para TypeScript para tipagem estática.
4. Criar testes unitários e de integração (Jest e React Testing Library).
5. Utilizar React Query para gerenciamento de cache e estado assíncrono.
6. Disponibilizar uma pipeline CI/CD (GitHub Actions) para build e push das imagens Docker.
7. Gerar URLs assinadas com vida mais longa configurável via propriedades.
