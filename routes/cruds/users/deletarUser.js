import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()


// DELETE - Remover usuário
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) }
    });

    return res.json({
      success: true,
      message: "Usuário removido com sucesso",
      data: null
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
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