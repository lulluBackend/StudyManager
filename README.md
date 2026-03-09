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
