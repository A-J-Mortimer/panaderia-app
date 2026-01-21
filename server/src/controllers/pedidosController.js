import { PrismaClient } from '@prisma/client';
import { ESTADOS_PEDIDO } from '../constants/estados.js';

const prisma = new PrismaClient();

// GET all pedidos
export const getAllPedidos = async (req, res, next) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        cliente: true,
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
    });
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

// GET pedido by ID
export const getPedidoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        cocinera: true,
        detalles: {
          include: {
            producto: {
              include: {
                recetas: {
                  include: {
                    ingrediente: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

// CREATE pedido
export const createPedido = async (req, res, next) => {
  try {
    const { clienteId, cocineraId, fechaEntrega, detalles } = req.body;

    if (!clienteId || !fechaEntrega || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({ 
        error: 'Cliente, fecha de entrega y al menos un producto son requeridos' 
      });
    }

    // Calculate total price
    let precioTotal = 0;
    const detallesData = detalles.map((detalle) => {
      const subtotal = parseFloat(detalle.precioUnitario) * parseInt(detalle.cantidad);
      precioTotal += subtotal;
      return {
        productoId: detalle.productoId,
        cantidad: parseInt(detalle.cantidad),
        precioUnitario: parseFloat(detalle.precioUnitario),
      };
    });

    const pedido = await prisma.pedido.create({
      data: {
        clienteId,
        cocineraId: cocineraId || null,
        fechaEntrega: new Date(fechaEntrega),
        estado: 'Confirmado',
        precioTotal,
        detalles: {
          create: detallesData,
        },
      },
      include: {
        cliente: true,
        cocinera: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
};

// UPDATE pedido
export const updatePedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clienteId, cocineraId, fechaEntrega, estado, detalles } = req.body;

    let updateData = {
      ...(clienteId && { clienteId }),
      ...(cocineraId !== undefined && { cocineraId: cocineraId || null }),
      ...(fechaEntrega && { fechaEntrega: new Date(fechaEntrega) }),
      ...(estado && { estado }),
    };

    // If detalles are updated, recalculate total
    if (Array.isArray(detalles)) {
      // Delete existing detalles
      await prisma.detallePedido.deleteMany({
        where: { pedidoId: id },
      });

      // Calculate new total
      let precioTotal = 0;
      const detallesData = detalles.map((detalle) => {
        const subtotal = parseFloat(detalle.precioUnitario) * parseInt(detalle.cantidad);
        precioTotal += subtotal;
        return {
          productoId: detalle.productoId,
          cantidad: parseInt(detalle.cantidad),
          precioUnitario: parseFloat(detalle.precioUnitario),
        };
      });

      updateData.precioTotal = precioTotal;
      updateData.detalles = {
        create: detallesData,
      };
    }

    const pedido = await prisma.pedido.update({
      where: { id },
      data: updateData,
      include: {
        cliente: true,
        cocinera: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    res.json(pedido);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    next(error);
  }
};

// UPDATE pedido estado
export const updatePedidoEstado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !ESTADOS_PEDIDO.includes(estado)) {
      return res.status(400).json({ 
        error: `Estado inválido. Debe ser uno de: ${ESTADOS_PEDIDO.join(', ')}` 
      });
    }

    const pedido = await prisma.pedido.update({
      where: { id },
      data: { estado },
      include: {
        cliente: true,
        cocinera: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    res.json(pedido);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    next(error);
  }
};

// DELETE pedido
export const deletePedido = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.pedido.delete({
      where: { id },
    });

    res.json({ message: 'Pedido eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    next(error);
  }
};
