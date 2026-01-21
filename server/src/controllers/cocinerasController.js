import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all cocineras
export const getAllCocineras = async (req, res, next) => {
  try {
    const cocineras = await prisma.cocinera.findMany({
      include: {
        pedidos: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
    res.json(cocineras);
  } catch (error) {
    next(error);
  }
};

// GET cocinera by ID
export const getCocineraById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cocinera = await prisma.cocinera.findUnique({
      where: { id },
      include: {
        pedidos: {
          include: {
            cliente: true,
            detalles: {
              include: {
                producto: true,
              },
            },
          },
        },
      },
    });

    if (!cocinera) {
      return res.status(404).json({ error: 'Cocinera no encontrada' });
    }

    res.json(cocinera);
  } catch (error) {
    next(error);
  }
};

// CREATE cocinera
export const createCocinera = async (req, res, next) => {
  try {
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
    }

    const cocinera = await prisma.cocinera.create({
      data: {
        nombre,
        telefono,
        ventas: 0,
      },
    });

    res.status(201).json(cocinera);
  } catch (error) {
    next(error);
  }
};

// UPDATE cocinera
export const updateCocinera = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, ventas } = req.body;

    const cocinera = await prisma.cocinera.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(telefono && { telefono }),
        ...(ventas !== undefined && { ventas }),
      },
    });

    res.json(cocinera);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cocinera no encontrada' });
    }
    next(error);
  }
};

// DELETE cocinera
export const deleteCocinera = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.cocinera.delete({
      where: { id },
    });

    res.json({ message: 'Cocinera eliminada exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cocinera no encontrada' });
    }
    next(error);
  }
};
