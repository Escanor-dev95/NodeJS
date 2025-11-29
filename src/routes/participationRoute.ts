import express, { json } from 'express';
import { getParticipations } from '../controllers';

const router = express.Router();

router.get('/', getParticipations);

export default router;
