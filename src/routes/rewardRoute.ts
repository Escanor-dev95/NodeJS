import express, { json } from 'express';
import { getRewards } from '../controllers';

const router = express.Router();

router.get('/', getRewards);

export default router;
