import express from 'express';
import { getChallenges, getChallenge, createChallenge, updateChallenge, deleteChallenge } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getChallenges);
router.get('/:id', getChallenge);
// Création, modification, suppression : owner (propriétaire) et customer (utilisateur)
router.post('/', authorizeRoles(["admin", "owner", "customer"]), createChallenge);
router.put('/:id', authorizeRoles(["admin", "owner",  "customer"]), updateChallenge);
router.delete('/:id', authorizeRoles(["admin","owner", "customer"]), deleteChallenge);

export default router;
