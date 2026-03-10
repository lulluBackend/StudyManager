import express from 'express';

//Importação de cada crud específico
import listarCourse from './cruds/courses/listarCourse.js';
import criarCourse from './cruds/courses/criarCourse.js';
import alterarCourse from './cruds/courses/alterarCourse.js';
import deletarCourse from './cruds/courses/deletarCourse.js';

const router = express.Router();

//Aqui acoplamos cada arquivo no roteador principal de usuários
//Como o prefixo "/courses" já vem do server.js, aqui usamos "/"
router.use('/', listarCourse);
router.use('/', criarCourse);
router.use('/', alterarCourse);
router.use('/', deletarCourse);

export default router;