import express from "express";
import {createRole, deleteRole, getRole, getRoles, updateRole} from "../controllers/roleController";
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get("/", getRoles);
router.get("/:id" ,getRole);
// Gestion des rôles réservée à l'admin
router.post("/", createRole);
router.put("/:id", authorizeRoles(["admin"]), updateRole);
router.delete("/:id", authorizeRoles(["admin"]), deleteRole);

export default router;
