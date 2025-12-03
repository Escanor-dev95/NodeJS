import express, { json } from 'express';
import { approveChallenge, getApprovedChallenges, getChallenges, getPopularChallenges, getUnapprovedChallenges } from '../controllers';

const router = express.Router();

router.put('/approve/:id', approveChallenge);
router.get('/unapproved', getUnapprovedChallenges);
router.get('/approved', getApprovedChallenges);
router.get('/popular/:limit', getPopularChallenges);
router.get('/', getChallenges);

export default router;
