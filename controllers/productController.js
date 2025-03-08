import Product from "../models/Product.js";

class ProductController {
  constructor() {}

  // Create new product
  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Crear el producto
      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error creating product:", error);

      res.status(500).json({
        success: false,
        error: "Error creating product",
        details: error.message,
      });
    }
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({
        success: false,
        error: "Error retrieving products",
        details: error.message,
      });
    }
  }

  // Get single product
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error("Error getting product:", error);
      res.status(500).json({
        success: false,
        error: "Error retrieving product",
        details: error.message,
      });
    }
  }

  // Update product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validar que hay datos para actualizar
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: "No se proporcionaron datos para actualizar",
        });
      }

      // Intentar actualizar el producto
      const product = await Product.update(id, updateData);

      if (!product) {
        console.log("❌ Producto no encontrado");
        return res.status(404).json({
          success: false,
          error: "Producto no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: "✅ Producto actualizado exitosamente",
        data: product,
      });
    } catch (error) {
      console.error("❌ Error al actualizar producto:", {
        error: error.message,
        stack: error.stack,
      });

      // Manejar errores específicos
      if (error.message.includes("Invalid ID format")) {
        return res.status(400).json({
          success: false,
          error: "Formato de ID inválido",
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al actualizar el producto",
        details: error.message,
      });
    }
  }

  // Delete product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.softDelete(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        success: false,
        error: "Error deleting product",
        details: error.message,
      });
    }
  }
}

// Create a single instance of the controller
const productController = new ProductController();

// Export the instance methods
export const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = productController;
