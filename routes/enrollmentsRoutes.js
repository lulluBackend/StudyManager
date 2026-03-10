import express from 'express';

//Importação de cada crud específico
import criarEnrollment from './cruds/enrollments/criarEnrollment.js';


const router = express.Router();

//Aqui acoplamos cada arquivo no roteador principal de usuários
//Como o prefixo "/users" já vem do server.js, aqui usamos "/"
router.use('/', criarEnrollment);

export default router;