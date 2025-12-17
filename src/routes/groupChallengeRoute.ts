import express from 'express';
import { getGroupChallenges, getGroupChallenge, createGroupChallenge, updateGroupChallenge, deleteGroupChallenge } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture réservée aux utilisateurs connectés
router.get('/', authorizeRoles(["owner", "customer"]), getGroupChallenges);
router.get('/:id', authorizeRoles(["owner", "customer"]), getGroupChallenge);
// Création, modification, suppression réservées aux utilisateurs connectés
router.post('/', authorizeRoles(["owner", "customer"]), createGroupChallenge);
router.put('/:id', authorizeRoles(["owner", "customer"]), updateGroupChallenge);
router.delete('/:id', authorizeRoles(["owner", "customer"]), deleteGroupChallenge);

export default router;
