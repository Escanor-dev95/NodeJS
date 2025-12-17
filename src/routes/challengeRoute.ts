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
	updateChallenge, getChallengeByUser, getPublicChallenges
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
router.get('/public', getPublicChallenges);
router.get('/:id', getChallenge);
router.get('/user/:id', getChallengeByUser);
// Création, modification, suppression : owner (propriétaire) et customer (utilisateur)
router.post('/', authorizeRoles(['owner', 'customer']), json(), createChallenge);
router.put('/:id', authorizeRoles(['owner', 'customer']), json(), updateChallenge);
router.delete('/:id', authorizeRoles(['owner', 'customer']), deleteChallenge);

export default router;
