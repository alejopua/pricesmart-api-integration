import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { authenticateJWT } from "../helpers/auth.js";

const router = express.Router();

// User routes
router.post("/register", authenticateJWT, registerUser);
router.post("/login", loginUser);
export default router;
