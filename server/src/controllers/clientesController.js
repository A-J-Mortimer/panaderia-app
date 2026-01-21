import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all clientes
export const getAllClientes = async (req, res, next) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        pedidos: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

// GET cliente by ID
export const getClienteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        pedidos: {
          include: {
            cocinera: true,
            detalles: {
              include: {
                producto: true,
              },
            },
          },
          orderBy: {
            fechaPedido: 'desc',
          },
        },
      },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    next(error);
  }
};

// CREATE cliente
export const createCliente = async (req, res, next) => {
  try {
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
    }

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        telefono,
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};

// UPDATE cliente
export const updateCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, telefono } = req.body;

    const cliente = await prisma.cliente.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(telefono && { telefono }),
      },
    });

    res.json(cliente);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    next(error);
  }
};

// DELETE cliente
export const deleteCliente = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({
      where: { id },
    });

    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    next(error);
  }
};
