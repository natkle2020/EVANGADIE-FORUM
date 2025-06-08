import express from "express";
import authMiddleware from "../middleware/auth.js";
import { register, login, checkUser } from "../controller/userController.js";

const router = express.Router();

//register route
router.post("/register", register);

//login user
router.post("/login", login);

//check user
router.get("/check", authMiddleware, checkUser);

export default router;
