import express, { json } from 'express';
import { getExercices } from '../controllers';

const router = express.Router();

router.get('/', getExercices);

export default router;
