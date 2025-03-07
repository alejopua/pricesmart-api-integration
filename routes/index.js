import express from "express";
import productRoutes from "./products.js";
import userRoutes from "./users.js";

const router = express.Router();

// Welcome route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to PriceSmart API",
    status: "Active",
    version: "1.0.0",
  });
});

// Routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
