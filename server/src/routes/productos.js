import express from 'express';
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoReceta,
  updateProductoReceta,
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', getAllProductos);
router.post('/', createProducto);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
router.get('/:id/receta', getProductoReceta);
router.put('/:id/receta', updateProductoReceta);

export default router;
