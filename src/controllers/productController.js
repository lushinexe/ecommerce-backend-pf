import ProductService from "../services/ProductService.js";

class ProductController {
  async list(req, res) {
    try {
      const result = await ProductService.listProducts(req.query);
      res.json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
      });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const product = await ProductService.addProduct(req.body);
      res.status(201).json({ status: "success", product });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductService.editProduct(req.params.id, req.body);
      if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      res.json({ status: "success", product });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.removeProduct(req.params.id);
      if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      res.json({ status: "success", message: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default new ProductController();
