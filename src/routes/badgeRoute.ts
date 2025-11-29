import express, { json } from 'express';
import { getBadges } from '../controllers';

const router = express.Router();

router.get('/', getBadges);

export default router;
