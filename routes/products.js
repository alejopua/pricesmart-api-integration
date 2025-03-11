import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateJWT } from "../helpers/auth.js";

const router = express.Router();

// Rutas de productos
router.post("/", createProduct); // Crear nuevo producto
router.get("/", getAllProducts); // Obtener todos los productos
router.get("/:id", getProductById); // Obtener un producto por ID
router.put("/:id", authenticateJWT, updateProduct); // Actualizar un producto
router.delete("/:id", authenticateJWT, deleteProduct); // Eliminar un producto

export default router;
