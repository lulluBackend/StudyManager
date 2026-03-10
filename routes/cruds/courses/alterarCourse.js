import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()


// UPDATE - Atualizar curso
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, workload } = req.body;

    const curso = await prisma.course.update({
      where: { id: Number(id) },
      data: { 
        title, 
        description, 
        workload: workload ? Number(workload) : undefined 
      }
    });

    return res.json({
      success: true,
      message: "Curso atualizado com sucesso",
      data: curso
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Curso não encontrado",
        data: null
      });
    }
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

export default router; //Exportar