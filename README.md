# StudyManager API

API RESTful para gerenciamento de usuários, cursos e matrículas, desenvolvida com Node.js, Express e Prisma ORM.

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- MariaDB/MySQL
- JavaScript (ES6+)

## Modelo de Dados

### User (Usuário)
- `id`: Integer (autoincrement, primary key)
- `name`: String
- `email`: String (unique)
- `created_at`: DateTime (default: now())

### Course (Curso)
- `id`: Integer (autoincrement, primary key)
- `title`: String
- `description`: String
- `workload`: Integer (carga horária em horas)

### Enrollment (Matrícula)
- `id`: Integer (autoincrement, primary key)
- `user_id`: Integer (foreign key)
- `course_id`: Integer (foreign key)
- `enrolled_at`: DateTime (default: now())

**Relacionamentos:**
- Um usuário pode ter várias matrículas
- Um curso pode ter várias matrículas
- Uma matrícula pertence a um único usuário e um único curso
- Restrição de unicidade: um usuário não pode se matricular duas vezes no mesmo curso

## Instalação e Configuração

### Pré-requisitos
- Node.js instalado
- MariaDB/MySQL instalado
- Git

Depois de ter os requisitos instalados, siga os passos abaixo para configurar o ambiente de desenvolvimento:

Você vai baixar o meu projeto usando esse comando:
``
git clone https://github.com/lulluBackend/StudyManager.git
``

Então entre na pasta do projeto
``
cd StudyManager
``

Instalar as dependências
``
npm install
``

Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto e adicione a URL de conexão com o seu banco de dados (MariaDB/MySQL):
Tem um arquivo chamado .env.exemple que mostra como é a estrutura esperada:
``
DATABASE_URL="mysql://username:suasenha@localhost:3306/sm_api"
DATABASE_USER="username"
DATABASE_PASSWORD="suasenha"
DATABASE_NAME="sm_api"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
``

Configurar o Banco de Dados (Prisma)
Execute as migrações para criar as tabelas no banco de dados e gerar o Prisma Client:

``
npx prisma migrate dev
``

**Como Usar**
Executando a API
Para iniciar o servidor em modo de desenvolvimento utilize o comando:
``
npx tsx server.js
``
ou

``
npm run dev
``

O servidor está configurado para estar disponível em **http://localhost:3000**

### Endpoints Disponíveis
```
| Método | Endpoint             | Descrição                                                   |
|--------|----------------------|-------------------------------------------------------------|
| GET    | /users               | Listar todos os usuários                                    |
| GET    | /users/:id           | Buscar um usuário específico                                |
| POST   | /users               | Criar um novo usuário                                       |
| PUT    | /users/:id           | Atualizar um usuário existente                              |
| DELETE | /users/:id           | Remover um usuário                                          |
|        |                      |                                                             |
| GET    | /courses             | Listar todos os cursos                                      |
| GET    | /courses/:id         | Buscar um curso específico                                  |
| POST   | /courses             | Criar um novo curso                                         |
| PUT    | /courses/:id         | Atualizar um curso existente                                |
| DELETE | /courses/:id         | Remover um curso                                            |
|        |                                                                                    |
| GET    | /users/:id/courses   | Listar cursos que um usuário específico está matriculado    |
```

## Estrutura do Projeto

O projeto utiliza uma **estrutura de roteamento modular** para facilitar a manutenção e organização do código.
### Arquivos Principais
- **`server.js`**  
  Ponto de entrada da aplicação. Responsável por iniciar o servidor e registrar as rotas.
- **`routes/`**  
  Diretório responsável pela **definição das rotas principais da API**.
- **`routes/cruds/`**  
  Contém a lógica separada de cada operação **CRUD**:
  - Create
  - Read
  - Update
  - Delete
- **`lib/prisma.js`**  
  Arquivo responsável por criar e exportar uma **instância única do Prisma Client**, utilizada para acessar o banco de dados em toda a aplicação.

