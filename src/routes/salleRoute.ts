import express, { json } from 'express';
import { getSalles } from '../controllers';

const router = express.Router();

router.get('/', getSalles);

export default router;
