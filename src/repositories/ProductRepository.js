import ProductDAO from "../dao/ProductDAO.js";

class ProductRepository {
  async getAllProducts(filter, options) {
    return await ProductDAO.getAll(filter, options);
  }

  async getProductById(id) {
    return await ProductDAO.getById(id);
  }

  async createProduct(data) {
    return await ProductDAO.create(data);
  }

  async updateProduct(id, data) {
    return await ProductDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await ProductDAO.delete(id);
  }
}

export default new ProductRepository();
