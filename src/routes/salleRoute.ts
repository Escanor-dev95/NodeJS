import express, { json } from 'express';
import {
    createSalle,
    deleteSalle,
    getSalle,
    getSalles,
    updateSalle,
} from '../controllers';

const router = express.Router();

router.get('/', getSalles);
router.get("/:id",getSalle);
router.post("/", createSalle);
router.put("/:id" ,updateSalle);
router.delete("/:id",deleteSalle);

export default router;
