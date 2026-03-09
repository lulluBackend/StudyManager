import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.ts";
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
export { prisma };
import express from "express";
import cors from "cors";
import db from "./database.js";

//Teste de conexão
db.execute("SELECT 1")
    .then(() => console.log("O banco foi conectado"))
    .catch(err => console.error("Erro ao conectar no banco:", err));

const app = express();
app.use(cors());
app.use(express.json());


/*
=================================
USUÁRIOS - CRUD
=================================
*/

//Criar usuário
app.post("/api/users", async (req, res) => {
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

//READ - Listar todos os usuários
app.get("/api/users", async (req, res) => {
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
app.get("/api/users/:id", async (req, res) => {
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

// UPDATE - Atualizar usuário
app.put("/api/users/:id", async (req, res) => {
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

// DELETE - Remover usuário
app.delete("/api/users/:id", async (req, res) => {
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

/*
=================================
CURSOS - CRUD
=================================
*/

// CREATE - Criar curso
app.post("/api/courses", async (req, res) => {
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

// READ - Listar todos os cursos
app.get("/api/courses", async (req, res) => {
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
app.get("/api/courses/:id", async (req, res) => {
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

// UPDATE - Atualizar curso
app.put("/api/courses/:id", async (req, res) => {
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

// DELETE - Remover curso
app.delete("/api/courses/:id", async (req, res) => {
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

/*
=================================
MATRÍCULAS
=================================
*/

// CREATE - Criar matrícula
app.post("/api/enrollments", async (req, res) => {
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

// READ - Listar cursos de um usuário
app.get("/api/users/:id/courses", async (req, res) => {
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

// Iniciar servidor
app.listen(3001, () => {
  console.log("servidor rodando na porta 3001");
});