import express, { json } from 'express';
import {
   createExercice,
    deleteExercice,
    getExercice,
    getExercices,
    updateExercice
} from '../controllers';

const router = express.Router();

router.get('/', getExercices);
router.get("/:id", getExercice);
router.post("/", createExercice);
router.put("/:id" ,updateExercice);
router.delete("/:id",deleteExercice);

export default router;
