import express, { json } from 'express';
import {
    getChallenges,
    getChallenge,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getChallengeByUser
} from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.get('/user/:id', getChallengeByUser);
// Création, modification, suppression : owner (propriétaire) et customer (utilisateur)
router.post('/', authorizeRoles(["owner", "customer"]), json(), createChallenge);
router.put('/:id', authorizeRoles(["owner", "customer"]), json(), updateChallenge);
router.delete('/:id', authorizeRoles(["owner", "customer"]), deleteChallenge);

export default router;
