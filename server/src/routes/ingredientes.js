import express from 'express';
import {
  getAllIngredientes,
  getIngredienteById,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} from '../controllers/ingredientesController.js';

const router = express.Router();

router.get('/', getAllIngredientes);
router.post('/', createIngrediente);
router.get('/:id', getIngredienteById);
router.put('/:id', updateIngrediente);
router.delete('/:id', deleteIngrediente);

export default router;
