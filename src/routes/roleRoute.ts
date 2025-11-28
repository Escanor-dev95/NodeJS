import express, {json} from "express";
import {createRole, deleteRole, getRole, getRoles, updateRole} from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.get("/:id", json() ,getRole);
router.post("/", createRole);
router.put("/:id", json() ,updateRole);
router.delete("/:id", json() ,deleteRole);

export default router;
