import express from 'express';
import { createExercice, deleteExercice, deleteExerciceBySalle, getExercice, getExerciceBySalle, getExercices, updateExercice } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getExercices);
router.get('/salle/:id', getExerciceBySalle);
router.get('/:id', getExercice);
// Gestion des types d'exercices réservée à l'admin
router.post('/', authorizeRoles(['admin']), createExercice);
router.put('/:id', authorizeRoles(['admin']), updateExercice);
router.delete('/salle/:id', authorizeRoles(['admin']), deleteExerciceBySalle);
router.delete('/:id', authorizeRoles(['admin']), deleteExercice);

export default router;
