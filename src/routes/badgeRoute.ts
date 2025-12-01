import express from 'express';
import {createBadge, deleteBadge, getBadge, getBadges, updateBadge} from '../controllers';

const router = express.Router();

router.get('/', getBadges);
router.get("/:id" ,getBadge);
router.post("/", createBadge);
router.put("/:id" ,updateBadge);
router.delete("/:id", deleteBadge);

export default router;
