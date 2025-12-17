import express from 'express';
import { getParticipations, createParticipation, getParticipation, updateParticipation, deleteParticipation, finishParticipation } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture et création réservées aux utilisateurs connectés (owner, customer)
router.get('/', getParticipations);
router.get('/:id', authorizeRoles(["owner", "customer"]), getParticipation);
router.post('/', authorizeRoles(["owner", "customer"]), createParticipation);
router.put('/:id', authorizeRoles(["owner", "customer"]), updateParticipation);
router.patch('/:id/finish', authorizeRoles(["owner", "customer"]), finishParticipation);
router.delete('/:id', authorizeRoles(["owner", "customer"]), deleteParticipation);


export default router;
