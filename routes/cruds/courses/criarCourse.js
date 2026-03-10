import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()



// CREATE - Criar curso
router.post("/", async (req, res) => {
  try {
    const { title, description, workload } = req.body;

    if (!title || !description || !workload) {
      return res.status(400).json({
        success: false,
        message: "Título, descrição e carga horária são obrigatórios",
        data: null
      });
    }

    const curso = await prisma.course.create({
      data: { title, description, workload: Number(workload) }
    });

    return res.status(201).json({
      success: true,
      message: "Curso cadastrado com sucesso",
      data: curso
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

export default router; //Exportar