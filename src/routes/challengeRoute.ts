import express, { json } from 'express';
import { authorizeRoles } from '../utils';
import {
	approveChallenge,
	createChallenge,
	deleteChallenge,
	getApprovedChallenges,
	getChallenge,
	getChallenges,
	getChallengesByDifficulty,
	getChallengesByDuration,
	getChallengesByExercise,
	getPopularChallenges,
	getUnapprovedChallenges,
	updateChallenge,
} from '../controllers';

const router = express.Router();

router.put('/approve/:id', approveChallenge);
router.get('/unapproved', getUnapprovedChallenges);
router.get('/approved', getApprovedChallenges);
router.get('/popular/:limit', getPopularChallenges);
router.get('/difficulty/:level', getChallengesByDifficulty);
router.get('/exercise/:id', getChallengesByExercise);
router.get('/duration/:min/:max', getChallengesByDuration);

router.get('/', getChallenges);
router.get('/:id', getChallenge);
// Création, modification, suppression : owner (propriétaire) et customer (utilisateur)
router.post('/', authorizeRoles(['owner', 'customer']), json(), createChallenge);
router.put('/:id', authorizeRoles(['owner', 'customer']), json(), updateChallenge);
router.delete('/:id', authorizeRoles(['owner', 'customer']), deleteChallenge);

export default router;
