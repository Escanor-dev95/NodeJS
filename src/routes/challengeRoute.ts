import express, { json } from 'express';
import { getChallenges } from '../controllers';

const router = express.Router();

router.get('/', getChallenges);

export default router;
