# API Express (Node + Prisma)

Descrição
-------

Projeto simples de API REST construída com Node.js, Express e Prisma ORM. O objetivo deste repositório é demonstrar um backend leve com acesso a banco de dados via Prisma, contendo modelos básicos como `Usuario` e `Perfil`.

Principais tecnologias
---------------------

- Node.js
- Express
- Prisma (Client gerado em `generated/prisma`)
- MySQL / MariaDB (configurável via `.env` e `prisma/schema.prisma`)

Estrutura do projeto (resumo)
-----------------------------

- `server.js` - ponto de entrada da aplicação (rotas e inicialização do servidor)
- `database.js` - configuração de conexão (se presente)
- `prisma/` - esquema Prisma e migrations
- `generated/prisma/` - cliente Prisma gerado pelo `prisma generate`
- `.env` - variáveis de ambiente (credenciais e URL do banco)

Pré-requisitos
--------------

- Node.js (versão 16+ recomendada)
- npm ou yarn
- Um servidor MySQL/MariaDB acessível (verifique `package.json` para dependências como `mysql2` e `@prisma/adapter-mariadb`)

Instalação
----------

1. Clone o repositório:

   git clone <url-do-repo>
   cd api_express

2. Instale dependências:

   npm install

Configuração (.env)
--------------------

Crie um arquivo `.env` na raiz do projeto (se já não existir) e adicione a variável de conexão com o banco de dados. Exemplos:
 
- MySQL (exemplo):

   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

- MariaDB (exemplo):

   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

Ajuste outras variáveis de ambiente conforme necessário no seu ambiente local. Verifique que as dependências `mysql2` e/ou `@prisma/adapter-mariadb` estejam instaladas no `package.json` quando for usar MySQL/MariaDB.

Prisma: gerar client e rodar migrations
--------------------------------------

Após configurar `DATABASE_URL` execute os comandos do Prisma:

1. Gerar o cliente Prisma (gera/atualiza `generated/prisma`):

   npx prisma generate

2. Aplicar migrations (ambiente de desenvolvimento):

   npx prisma migrate dev

Se estiver em produção e já possuir migrations geradas, prefira:

   npx prisma migrate deploy

Observação: existem migrations já no diretório `prisma/migrations` — adapte conforme seu fluxo.

Executando a aplicação
----------------------

Para iniciar o servidor em modo simples:

   node server.js

Ou, se houver script de desenvolvimento (verificar `package.json`), por exemplo:

   npm run dev

Testes rápidos / Exemplos de uso
-------------------------------

Cheque `server.js` para ver as rotas expostas. Exemplos típicos que você pode encontrar (ajuste conforme implementação real):

- `GET /` - saúde da API
- `GET /usuarios` - listar usuários
- `POST /usuarios` - criar usuário

Exemplo de request cURL (substitua pela rota real do seu projeto):

   curl -X GET http://localhost:3000/usuarios

Boas práticas de desenvolvimento
-------------------------------

- Mantenha o `.env` fora do controle de versão (adicione em `.gitignore`).
- Gere o cliente Prisma sempre que alterar o `schema.prisma` com `npx prisma generate`.
- Use `npx prisma studio` para inspecionar dados durante o desenvolvimento.

Contribuindo
------------

1. Faça um fork deste repositório.
2. Crie uma branch com sua feature: `git checkout -b feat/minha-feature`.
3. Abra um pull request descrevendo as mudanças.

Contato
-------

Se precisar de ajuda para configurar ou rodar o projeto, abra uma issue descrevendo o ambiente (OS, Node.js versão, DB usado) e os passos que executou.

Licença
-------

Este projeto não possui licença especificada. Adicione uma licença se for publicar ou compartilhar publicamente.
