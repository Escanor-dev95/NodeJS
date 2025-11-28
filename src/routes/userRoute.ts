import express, {json} from "express";
import {getUsers, createUser, updateUser, deleteUser, getUser} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/:user_id", json() ,getUser);
router.post("/", createUser);
router.put("/:user_id", json() ,updateUser);
router.delete("/:user_id", json() ,deleteUser);

export default router;
