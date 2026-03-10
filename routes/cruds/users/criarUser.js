import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()


//Criar usuário
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Nome e email são obrigatórios",
        data: null
      });
    }

    const usuario = await prisma.user.create({
      data: { name, email }
    });

    return res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: usuario
    });

  } catch (error) {
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