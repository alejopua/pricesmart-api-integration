import express from "express";
import productRoutes from "./products.js";
import userRoutes from "./users.js";
const router = express.Router();

// Conectar rutas de productos
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
