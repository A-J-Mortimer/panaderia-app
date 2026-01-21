import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all productos
export const getAllProductos = async (req, res, next) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        recetas: {
          include: {
            ingrediente: true,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

// GET producto by ID
export const getProductoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        recetas: {
          include: {
            ingrediente: true,
          },
        },
        detallesPedido: {
          include: {
            pedido: true,
          },
        },
      },
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// CREATE producto
export const createProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, tiempoElaboracion, costoGasElectricidad, precioVenta } = req.body;

    if (!nombre || tiempoElaboracion === undefined || costoGasElectricidad === undefined || precioVenta === undefined) {
      return res.status(400).json({ 
        error: 'Nombre, tiempo de elaboración, costo gas/electricidad y precio de venta son requeridos' 
      });
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        tiempoElaboracion: parseInt(tiempoElaboracion),
        costoGasElectricidad: parseFloat(costoGasElectricidad),
        precioVenta: parseFloat(precioVenta),
      },
    });

    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

// UPDATE producto
export const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tiempoElaboracion, costoGasElectricidad, precioVenta } = req.body;

    const producto = await prisma.producto.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(descripcion !== undefined && { descripcion }),
        ...(tiempoElaboracion !== undefined && { tiempoElaboracion: parseInt(tiempoElaboracion) }),
        ...(costoGasElectricidad !== undefined && { costoGasElectricidad: parseFloat(costoGasElectricidad) }),
        ...(precioVenta !== undefined && { precioVenta: parseFloat(precioVenta) }),
      },
    });

    res.json(producto);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    next(error);
  }
};

// DELETE producto
export const deleteProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.producto.delete({
      where: { id },
    });

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    next(error);
  }
};

// GET producto receta
export const getProductoReceta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recetas = await prisma.receta.findMany({
      where: { productoId: id },
      include: {
        ingrediente: true,
      },
    });

    res.json(recetas);
  } catch (error) {
    next(error);
  }
};

// UPDATE producto receta
export const updateProductoReceta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recetas } = req.body;

    if (!Array.isArray(recetas)) {
      return res.status(400).json({ error: 'Recetas debe ser un array' });
    }

    // Delete existing recetas
    await prisma.receta.deleteMany({
      where: { productoId: id },
    });

    // Create new recetas
    const newRecetas = await Promise.all(
      recetas.map((receta) =>
        prisma.receta.create({
          data: {
            productoId: id,
            ingredienteId: receta.ingredienteId,
            cantidad: parseFloat(receta.cantidad),
            unidad: receta.unidad,
          },
          include: {
            ingrediente: true,
          },
        })
      )
    );

    res.json(newRecetas);
  } catch (error) {
    next(error);
  }
};
