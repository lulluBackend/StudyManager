import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()


// UPDATE - Atualizar usuário
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const usuario = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email }
    });

    return res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      data: usuario
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
        data: null
      });
    }
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
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

export default router //Exportar