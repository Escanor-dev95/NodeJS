import express, { json } from 'express';
import {
    approvedSalle,
    createSalle,
    deleteSalle,
    getSalle,
    getSalleApproved,
    getSalles,
    updateSalle,
} from '../controllers';

const router = express.Router();

router.get('/', getSalles);
router.get("/approved/", getSalleApproved)
router.get("/:id",getSalle);
router.post("/", createSalle);
router.put("/approved/:id", approvedSalle);
router.put("/:id" ,updateSalle);
router.delete("/:id",deleteSalle);

export default router;
