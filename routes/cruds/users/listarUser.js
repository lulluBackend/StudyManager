import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()



//READ - Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();

    return res.json({
      success: true,
      message: "Usuários encontrados com sucesso",
      data: usuarios
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

// READ - Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await prisma.user.findUnique({
      where: { id: Number(id) }
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
        data: null
      });
    }

    return res.json({
      success: true,
      message: "Usuário encontrado com sucesso",
      data: usuario
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

export default router //Exportar