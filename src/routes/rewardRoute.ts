import express from 'express';
import { createReward, deleteReward, getReward, getRewards, updateReward, getUserRewardsHandler, manualAwardHandler, getRewardsByBadge } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getRewards);
router.get('/:id', getReward);
router.get('/badge/:id', getRewardsByBadge);
router.get('/user/:id', getUserRewardsHandler);
// Création, modification, suppression réservées à l'admin
router.post('/', authorizeRoles(['admin']), createReward);
router.put('/:id', authorizeRoles(['admin']), updateReward);
router.delete('/:id', authorizeRoles(['admin']), deleteReward);
router.post('/award', authorizeRoles(['admin']), manualAwardHandler);

export default router;
