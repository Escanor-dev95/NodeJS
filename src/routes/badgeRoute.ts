import express from 'express';
import {createBadge, deleteBadge, getBadge, getBadges, updateBadge, recalculateBadges} from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getBadges);
router.get("/:id" ,getBadge);
// Création, modification, suppression réservées à l'admin
router.post("/", authorizeRoles(["admin"]), createBadge);
router.post('/recalculate', authorizeRoles(["admin"]), recalculateBadges);
router.put("/:id", authorizeRoles(["admin"]), updateBadge);
router.delete("/:id", authorizeRoles(["admin"]), deleteBadge);

export default router;
