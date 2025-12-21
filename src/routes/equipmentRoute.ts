import express from 'express';
import { createEquipment, deleteEquipment, deleteEquipmentBySalle, getEquipment, getEquipmentBySalle, getEquipments, updateEquipment } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getEquipments);
router.get('/salle/:id', getEquipmentBySalle);
router.get('/:id', getEquipment);
// Gestion des équipements réservée à l'admin
router.post('/', authorizeRoles(['admin']), createEquipment);
router.put('/:id', authorizeRoles(['admin']), updateEquipment);
router.delete('/salle/:id', authorizeRoles(['admin']), deleteEquipmentBySalle);
router.delete('/:id', authorizeRoles(['admin']), deleteEquipment);

export default router;
