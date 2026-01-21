import express from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/', getAllClientes);
router.post('/', createCliente);
router.get('/:id', getClienteById);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;
