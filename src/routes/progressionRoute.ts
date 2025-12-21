import express, { json } from 'express';
import { getProgression, createProgression, deleteProgression, updateProgression, getProgressions, getProgressionByUserId } from '../controllers';

const router = express.Router();

router.get('/', getProgressions);
router.get('/:id', getProgression);
router.get('/user/:id', getProgressionByUserId);
router.post('/', createProgression);
router.put('/:id', updateProgression);
router.delete('/:id', deleteProgression);

export default router;
