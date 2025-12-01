import express from 'express';
import {
    createEquipment,
    deleteEquipment,
    getEquipment, getEquipmentBySalle,
    getEquipments,
    updateEquipment,
} from '../controllers';

const router = express.Router();

router.get('/', getEquipments);
router.get('/salle/:id', getEquipmentBySalle);
router.get("/:id", getEquipment);
router.post("/", createEquipment);
router.put("/:id" ,updateEquipment);
router.delete("/:id",deleteEquipment);

export default router;
