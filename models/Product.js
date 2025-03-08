import productSchema from "../schemas/products.js";
import mongoose from "mongoose";
class Product {
  // Crear un nuevo producto
  async create(productData) {
    try {
      return await productSchema.create(productData);
    } catch (error) {
      console.error("Error in create product:", error);
      throw error;
    }
  }

  // Actualizar producto
  async update(id, updateData) {
    try {
      return await productSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), isActive: true },
        updateData,
        { new: true }
      );
    } catch (error) {
      console.error("❌ Error en update producto:", error);
      throw error;
    }
  }

  // Soft delete
  async softDelete(id) {
    try {
      return await productSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), isActive: true },
        {
          isActive: false,
          updatedAt: new Date(),
        },
        { returnDocument: "after" }
      );
    } catch (error) {
      console.error("Error in softDelete product:", error);
      throw error;
    }
  }

  // Encontrar todos los productos activos
  async findAll(query = {}) {
    try {
      return await productSchema.find({ ...query, isActive: true });
    } catch (error) {
      console.error("Error in findAll products:", error);
      throw error;
    }
  }

  // Encontrar producto por ID
  async findById(id) {
    try {
      return await productSchema.findById({
        _id: new mongoose.Types.ObjectId(id),
        isActive: true,
      });
    } catch (error) {
      console.error("Error in findById product:", error);
      throw error;
    }
  }
}

// Crear una única instancia del modelo
const productModel = new Product();

export default productModel;
