class ProductController {
  // Get all products
  async getAllProducts(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: [], // Here you would fetch from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving products",
        error: error.message,
      });
    }
  }

  // Get single product
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: { id }, // Here you would fetch from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving product",
        error: error.message,
      });
    }
  }

  // Create new product
  async createProduct(req, res) {
    try {
      const productData = req.body;
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: productData, // Here you would save to your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating product",
        error: error.message,
      });
    }
  }

  // Update product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: { id, ...updateData }, // Here you would update in your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  }

  // Delete product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: { id }, // Here you would delete from your database
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
    }
  }
}

// Create a single instance of the controller
const productController = new ProductController();

// Export the instance methods
export const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;
