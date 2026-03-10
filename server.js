import { prisma } from "./lib/prisma" //Importar dessa forma e iniciar projeto com "npx tsx server.js"

//Importação das rotas criadas:
//------------------------------------------------------------------
import userRoutes from './routes/usersRoutes.js';
import courseRoutes from './routes/coursesRoutes.js';
import enrollmentsRoutes from './routes/enrollmentsRoutes.js';
//------------------------------------------------------------------

import express from "express";
import cors from "cors";
import db from "./database.js";

const port = 3000;

//Testar de conexão
db.execute("SELECT 1")
    .then(() => console.log("O banco foi conectado"))
    .catch(err => console.error("Erro ao conectar no banco:", err));

const app = express();
app.use(cors());
app.use(express.json()) //Importante para aceitar JSON no corpo das requisições

//Fazer conexão com as rotas
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentsRoutes);

//Mensagem Hello World na raíz
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Iniciar servidor
app.listen(port, () => {
  console.log("servidor rodando na porta " + port);
});