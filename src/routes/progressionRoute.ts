import express, { json } from 'express';
import { getProgression } from '../controllers';

const router = express.Router();

router.get('/', getProgression);

export default router;
