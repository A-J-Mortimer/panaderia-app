import express from 'express';
import {
  getAllCocineras,
  getCocineraById,
  createCocinera,
  updateCocinera,
  deleteCocinera,
} from '../controllers/cocinerasController.js';

const router = express.Router();

router.get('/', getAllCocineras);
router.post('/', createCocinera);
router.get('/:id', getCocineraById);
router.put('/:id', updateCocinera);
router.delete('/:id', deleteCocinera);

export default router;
