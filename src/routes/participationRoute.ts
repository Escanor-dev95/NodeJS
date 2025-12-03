import express, { json } from 'express';
import { createParticipation, getParticipations } from '../controllers';

const router = express.Router();

router.get('/', getParticipations);
router.post('/', createParticipation);

export default router;
