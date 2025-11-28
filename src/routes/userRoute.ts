import express, {json} from "express";
import {getUsers, createUser, updateUser, deleteUser} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:user_id", json() ,updateUser);
router.delete("/:user_id", json() ,deleteUser);

export default router;
