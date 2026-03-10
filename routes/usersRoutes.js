import express from 'express';

//Importação de cada crud específico
import listarUser from './cruds/users/listarUser.js';
import criarUser from './cruds/users/criarUser.js';
import alterarUser from './cruds/users/alterarUser.js';
import deletarUser from './cruds/users/deletarUser.js';
import consultaRelacional from './cruds/users/consultaRelacional.js';

const router = express.Router();

//Aqui acoplamos cada arquivo no roteador principal de usuários
//Como o prefixo "/users" já vem do server.js, aqui usamos "/"
router.use('/', listarUser);
router.use('/', criarUser);
router.use('/', alterarUser);
router.use('/', deletarUser);
router.use('/', consultaRelacional);

export default router;