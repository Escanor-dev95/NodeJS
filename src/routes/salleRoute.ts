import express from 'express';
import { approveSalle, createSalle, deleteSalle, getSalle, getApprovedSalles, getSalles, updateSalle, suggestChallenge, getSuggestedChallenges } from '../controllers';

const router = express.Router();

router.get('/', getSalles);
router.get('/approved', getApprovedSalles);

router.post('/', createSalle);

router.put('/approved/:id', approveSalle);
router.put('/suggest/:id', suggestChallenge);
router.get('/suggested/:id', getSuggestedChallenges);

router.get('/:id', getSalle);
router.put('/:id', updateSalle);
router.delete('/:id', deleteSalle);

export default router;
