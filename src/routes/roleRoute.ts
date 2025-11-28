import express, {json} from "express";
import {createRole, deleteRole, getRole, getRoles, updateRole} from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.get("/:role_id", json() ,getRole);
router.post("/", createRole);
router.put("/:role_id", json() ,updateRole);
router.delete("/:role_id", json() ,deleteRole);

export default router;
