import express from 'express'
import { prisma } from "../../../lib/prisma.js" 

const router = express.Router()

// READ - Listar cursos de um usuário
router.get("/:id/courses", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
        data: null
      });
    }

    // Formatar a resposta
    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      courses: user.enrollments.map(enrollment => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        workload: enrollment.course.workload,
        enrolled_at: enrollment.enrolled_at
      }))
    };

    return res.json({
      success: true,
      message: "Cursos do usuário encontrados com sucesso",
      data: response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      data: null
    });
  }
});

export default router;