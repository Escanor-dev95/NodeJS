import express from 'express';
import { getParticipations, createParticipation, getParticipation, updateParticipation, deleteParticipation, finishParticipation } from '../controllers';

const router = express.Router();

router.get('/', getParticipations);
router.get('/:id', getParticipation);
router.post('/', createParticipation);
router.put('/:id', updateParticipation);
router.patch('/:id/finish', finishParticipation);
router.delete('/:id', deleteParticipation);


export default router;
