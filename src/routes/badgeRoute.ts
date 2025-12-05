import express from 'express';
import {createBadge, deleteBadge, getBadge, getBadges, updateBadge, recalculateBadges} from '../controllers';

const router = express.Router();

router.get('/', getBadges);
router.get("/:id" ,getBadge);
router.post("/", createBadge);
router.post('/recalculate', recalculateBadges);
router.put("/:id" ,updateBadge);
router.delete("/:id", deleteBadge);

export default router;
