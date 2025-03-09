import userSchema from "../schemas/users.js";
import mongoose from "mongoose";

class User {
  async create(userData) {
    try {
      return await userSchema.create(userData);
    } catch (error) {
      console.error("Error in create user:", error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      return await userSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), isActive: true },
        updateData,
        { new: true }
      );
    } catch (error) {
      console.error("❌ Error en update usuario:", error);
      throw error;
    }
  }

  async softDelete(id) {
    try {
      return await userSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), isActive: true },
        {
          isActive: false,
          updatedAt: new Date(),
        },
        { returnDocument: "after" }
      );
    } catch (error) {
      console.error("Error in softDelete user:", error);
      throw error;
    }
  }

  // Encontrar todos los usuarios activos
  async findAll(query = {}) {
    try {
      return await userSchema.find({ ...query, isActive: true });
    } catch (error) {
      console.error("Error in findAll users:", error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      return await userSchema.findOne({
        email,
        isActive: true,
      });
    } catch (error) {
      console.error("Error in findByEmail user:", error);
      throw error;
    }
  }
}

// Crear una única instancia del modelo
const userModel = new User();

export default userModel;
