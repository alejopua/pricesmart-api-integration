import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";

class Product {
  constructor() {
    this.collection = "products";
  }

  // Obtener la colección
  getCollection() {
    return dbClient.getDb().collection(this.collection);
  }

  // Crear un nuevo producto
  async create(productData) {
    try {
      const collection = this.getCollection();
      const result = await collection.insertOne({
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });

      if (!result.acknowledged) {
        throw new Error("Failed to create product");
      }

      return {
        _id: result.insertedId,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
    } catch (error) {
      console.error("Error in create product:", error);
      throw error;
    }
  }

  // Encontrar todos los productos activos
  async findAll(query = {}) {
    try {
      const collection = this.getCollection();
      return await collection.find({ ...query, isActive: true }).toArray();
    } catch (error) {
      console.error("Error in findAll products:", error);
      throw error;
    }
  }

  // Encontrar producto por ID
  async findById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }

      const collection = this.getCollection();
      return await collection.findOne({
        _id: new ObjectId(id),
        isActive: true,
      });
    } catch (error) {
      console.error("Error in findById product:", error);
      throw error;
    }
  }

  // Actualizar producto
  async update(id, updateData) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }

      const collection = this.getCollection();
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id), isActive: true },
        {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );

      return result.value;
    } catch (error) {
      console.error("Error in update product:", error);
      throw error;
    }
  }

  // Soft delete
  async softDelete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
      }

      const collection = this.getCollection();
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id), isActive: true },
        {
          $set: {
            isActive: false,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );

      return result.value;
    } catch (error) {
      console.error("Error in softDelete product:", error);
      throw error;
    }
  }
}

// Crear una única instancia del modelo
const productModel = new Product();

export default productModel;
