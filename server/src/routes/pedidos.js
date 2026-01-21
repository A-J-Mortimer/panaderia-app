import express from 'express';
import {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  updatePedidoEstado,
  deletePedido,
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/', getAllPedidos);
router.post('/', createPedido);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.patch('/:id/estado', updatePedidoEstado);
router.delete('/:id', deletePedido);

export default router;
