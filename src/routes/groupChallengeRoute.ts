import express, { json } from 'express';
import { getGroupChallenges } from '../controllers';

const router = express.Router();

router.get('/', getGroupChallenges);

export default router;
