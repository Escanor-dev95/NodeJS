import express from 'express';
import {
    createReward,
    deleteReward,
    getReward,
    getRewards,
    updateReward,
    listBadgesHandler,
    getUserRewardsHandler,
    manualAwardHandler
} from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getRewards);
router.get("/:id" ,getReward);
router.get('/badges', listBadgesHandler);
router.get('/users/:id/rewards', getUserRewardsHandler);
// Création, modification, suppression réservées à l'admin
router.post("/", authorizeRoles(["admin"]), createReward);
router.put("/:id", authorizeRoles(["admin"]), updateReward);
router.delete("/:id", authorizeRoles(["admin"]), deleteReward);
router.post('/award', authorizeRoles(["admin"]), manualAwardHandler);

export default router;
