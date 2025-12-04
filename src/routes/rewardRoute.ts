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

const router = express.Router();

router.get('/', getRewards);
router.get("/:id" ,getReward);
router.post("/", createReward);
router.put("/:id" ,updateReward);
router.delete("/:id", deleteReward);

//----
router.get('/badges', listBadgesHandler);
router.get('/users/:id/rewards', getUserRewardsHandler);
router.post('/award', manualAwardHandler);

export default router;
