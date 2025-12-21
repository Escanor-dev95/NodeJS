import express from 'express';
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
	getChallengesByExercice,
	getPopularChallenges,
	getUnapprovedChallenges,
	updateChallenge,
	getChallengeByUser,
	getPublicChallenges,
} from '../controllers';

const router = express.Router();

router.put('/approve/:id', approveChallenge);
router.get('/unapproved', getUnapprovedChallenges);
router.get('/approved', getApprovedChallenges);
router.get('/popular', getPopularChallenges);
router.get('/difficulty/:level', getChallengesByDifficulty);
router.get('/exercice/:id', getChallengesByExercice);
router.get('/duration', getChallengesByDuration);

router.get('/', getChallenges);
router.get('/public', getPublicChallenges);
router.get('/:id', getChallenge);
router.get('/user/:id', getChallengeByUser);
// Création, modification, suppression : owner (propriétaire) et customer (utilisateur)
router.post('/', authorizeRoles(['admin', 'owner', 'customer']), createChallenge);
router.put('/:id', authorizeRoles(['admin', 'owner', 'customer']), updateChallenge);
router.patch('/approve/:id', approveChallenge);
router.delete('/:id', authorizeRoles(['admin', 'owner', 'customer']), deleteChallenge);

export default router;
