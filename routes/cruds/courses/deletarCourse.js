import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()

// DELETE - Remover curso
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id: Number(id) }
    });

    return res.json({
      success: true,
      message: "Curso removido com sucesso",
      data: null
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