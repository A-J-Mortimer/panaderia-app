import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all ingredientes
export const getAllIngredientes = async (req, res, next) => {
  try {
    const ingredientes = await prisma.ingrediente.findMany({
      include: {
        recetas: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });
    res.json(ingredientes);
  } catch (error) {
    next(error);
  }
};

// GET ingrediente by ID
export const getIngredienteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingrediente = await prisma.ingrediente.findUnique({
      where: { id },
      include: {
        recetas: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!ingrediente) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }

    res.json(ingrediente);
  } catch (error) {
    next(error);
  }
};

// CREATE ingrediente
export const createIngrediente = async (req, res, next) => {
  try {
    const { nombre, descripcion, costoPorKg } = req.body;

    if (!nombre || costoPorKg === undefined) {
      return res.status(400).json({ error: 'Nombre y costo por kg son requeridos' });
    }

    const ingrediente = await prisma.ingrediente.create({
      data: {
        nombre,
        descripcion,
        costoPorKg: parseFloat(costoPorKg),
      },
    });

    res.status(201).json(ingrediente);
  } catch (error) {
    next(error);
  }
};

// UPDATE ingrediente
export const updateIngrediente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, costoPorKg } = req.body;

    const ingrediente = await prisma.ingrediente.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(descripcion !== undefined && { descripcion }),
        ...(costoPorKg !== undefined && { costoPorKg: parseFloat(costoPorKg) }),
      },
    });

    res.json(ingrediente);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
    next(error);
  }
};

// DELETE ingrediente
export const deleteIngrediente = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.ingrediente.delete({
      where: { id },
    });

    res.json({ message: 'Ingrediente eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
    next(error);
  }
};
