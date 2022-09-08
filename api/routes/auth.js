import express from "express";
import { Login, CreateNewUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", CreateNewUser)
router.post("/login", Login)

export default router