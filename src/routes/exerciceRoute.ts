import express, { json } from 'express';
import {
    createExercice,
    deleteExercice, deleteExerciceBySalle,
    getExercice, getExerciceBySalle,
    getExercices,
    updateExercice
} from '../controllers';

const router = express.Router();

router.get('/', getExercices);
router.get("/salle/:id", getExerciceBySalle);
router.get("/:id", getExercice);
router.post("/", createExercice);
router.put("/:id" ,updateExercice);
router.delete("/salle/:id", deleteExerciceBySalle)
router.delete("/:id",deleteExercice);

export default router;
