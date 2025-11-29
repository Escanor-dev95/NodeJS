import express, { json } from 'express';
import { getEquipments } from '../controllers';

const router = express.Router();

router.get('/', getEquipments);

export default router;
