import Product from "../models/Product.js";

class ProductController {
  constructor() {}

  // Create new product
  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Validar datos requeridos
      const requiredFields = [
        "name",
        "description",
        "price",
        "category",
        "sku",
        "brand",
      ];
      const missingFields = requiredFields.filter(
        (field) => !productData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
          fields: missingFields,
        });
      }

      // Crear el producto
      const product = await Product.create({
        ...productData,
        stock: productData.stock || 0,
        discount: productData.discount || 0,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error creating product:", error);

      // Manejar error de SKU duplicado
      if (
        error.message.includes("duplicate key error") &&
        error.message.includes("sku")
      ) {
        return res.status(400).json({
          success: false,
          error: "A product with this SKU already exists",
        });
      }

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
      const product = await Product.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        success: false,
        error: "Error updating product",
        details: error.message,
      });
    }
  }

  // Delete product
  async deleteProduct(req, res) {
    try {
      const product = await Product.softDelete(req.params.id);
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
