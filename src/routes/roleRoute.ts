import express from "express";
import {createRole, deleteRole, getRole, getRoles, updateRole} from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.get("/:id" ,getRole);
router.post("/", createRole);
router.put("/:id" ,updateRole);
router.delete("/:id",deleteRole);

export default router;
