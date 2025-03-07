import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get user profile
router.post("/login", loginUser); // Login user
router.put("/:id", updateUser); // Update user
router.delete("/:id", deleteUser); // Delete user
router.post("/register", registerUser); // Register new user

export default router;
