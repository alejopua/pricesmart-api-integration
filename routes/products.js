import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Rutas de productos
router.post("/", createProduct); // Crear nuevo producto
router.get("/", getAllProducts); // Obtener todos los productos
router.get("/:id", getProductById); // Obtener un producto por ID
router.put("/:id", updateProduct); // Actualizar un producto
router.delete("/:id", deleteProduct); // Eliminar un producto

export default router;
