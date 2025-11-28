import express, {json} from "express";
import {getUsers, createUser, updateUser, deleteUser, getUser} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", json() ,getUser);
router.post("/", createUser);
router.put("/:id", json() ,updateUser);
router.delete("/:id", json() ,deleteUser);

export default router;
