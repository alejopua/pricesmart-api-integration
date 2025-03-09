import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";

class UserController {
  // Register new user
  async registerUser(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({
          success: false,
          error: "User already exists",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const userData = await UserModel.create({
        name,
        email,
        password: passwordHash,
        phone,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: userData,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
    }
  }

  // Login user
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const userExists = await UserModel.findByEmail(email);
      if (!userExists) {
        return res.status(400).json({
          success: false,
          error: "User does not exist",
        });
      }

      const validatePassword = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!validatePassword) {
        return res.status(400).json({
          success: false,
          error: "Password is incorrect",
        });
      }

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: { email }, // Here you would generate and return a token
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: [], // Here you would fetch from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving users",
        error: error.message,
      });
    }
  }

  // Get user profile
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: { id }, // Here you would fetch from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving user",
        error: error.message,
      });
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: { id, ...updateData }, // Here you would update in your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message,
      });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: { id }, // Here you would delete from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message,
      });
    }
  }
}

// Create a single instance of the controller
const userController = new UserController();

// Export the instance methods
export const { registerUser, loginUser } = userController;
