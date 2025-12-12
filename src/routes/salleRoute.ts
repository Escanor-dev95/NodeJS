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
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getSalles);
router.get("/approved/", getSalleApproved)
router.get("/:id",getSalle);
// Création, modification, suppression, approbation réservées à l'admin
router.post("/", authorizeRoles(["admin"]), createSalle);
router.put("/approved/:id", authorizeRoles(["admin"]), approvedSalle);
router.put("/:id" , authorizeRoles(["admin", "owner"]), updateSalle);
router.delete("/:id", authorizeRoles(["admin"]), deleteSalle);

export default router;
