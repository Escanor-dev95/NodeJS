import express from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    hideUser,
    getActiveUser
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/active", getActiveUser);
router.get("/:id",getUser);
router.post("/",createUser);
router.put("/:id",updateUser);
router.put("/hide/:id",hideUser);
router.delete("/:id",deleteUser);

export default router;
