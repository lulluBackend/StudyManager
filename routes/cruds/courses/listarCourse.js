import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()



// READ - Listar todos os cursos
router.get("/", async (req, res) => {
  try {
    const cursos = await prisma.course.findMany();

    return res.json({
      success: true,
      message: "Cursos encontrados com sucesso",
      data: cursos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

// READ - Buscar curso por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const curso = await prisma.course.findUnique({
      where: { id: Number(id) }
    });

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: "Curso não encontrado",
        data: null
      });
    }

    return res.json({
      success: true,
      message: "Curso encontrado com sucesso",
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