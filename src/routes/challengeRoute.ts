import express, { json } from 'express';
import { getChallenges, getChallenge, createChallenge, updateChallenge, deleteChallenge } from '../controllers';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.post('/', json(), createChallenge);
router.put('/:id', json(), updateChallenge);
router.delete('/:id', deleteChallenge);

export default router;
