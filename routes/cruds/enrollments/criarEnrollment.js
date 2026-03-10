import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()


// CREATE - Criar matrícula
router.post("/", async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        success: false,
        message: "ID do usuário e ID do curso são obrigatórios",
        data: null
      });
    }

    // Verificar se usuário existe
    const user = await prisma.user.findUnique({
      where: { id: Number(user_id) }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
        data: null
      });
    }

    // Verificar se curso existe
    const course = await prisma.course.findUnique({
      where: { id: Number(course_id) }
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Curso não encontrado",
        data: null
      });
    }

    // Criar matrícula
    const enrollment = await prisma.enrollment.create({
      data: {
        user_id: Number(user_id),
        course_id: Number(course_id)
      },
      include: {
        user: true,
        course: true
      }
    });

    return res.status(201).json({
      success: true,
      message: "Matrícula realizada com sucesso",
      data: enrollment
    });

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Usuário já está matriculado neste curso",
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

export default router;