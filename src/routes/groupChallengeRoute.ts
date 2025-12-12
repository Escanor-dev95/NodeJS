import express from 'express';
import { getGroupChallenges } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture réservée aux utilisateurs connectés
router.get('/', authorizeRoles(["owner", "customer"]), getGroupChallenges);

export default router;
