import express from 'express';
import {
    createReward,
    deleteReward,
    getReward,
    getRewards,
    updateReward
} from '../controllers';

const router = express.Router();

router.get('/', getRewards);
router.get("/:id" ,getReward);
router.post("/", createReward);
router.put("/:id" ,updateReward);
router.delete("/:id", deleteReward);

export default router;
