import express, { Request, Response } from "express";
import { login } from "../controllers/loginController";

const router = express.Router();

router.post("/login", login);

export default router;
