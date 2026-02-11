import ProductRepository from "../repositories/ProductRepository.js";

class ProductService {
  async listProducts(queryParams) {
    const { limit = 10, page = 1, sort, query } = queryParams;

    const filter = {};
    if (query) {
      if (query === "available") filter.available = true;
      else filter.category = query;
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}
    };

    return await ProductRepository.getAllProducts(filter, options);
  }

  async getProduct(id) {
    return await ProductRepository.getProductById(id);
  }

  async addProduct(data) {
    return await ProductRepository.createProduct(data);
  }

  async editProduct(id, data) {
    return await ProductRepository.updateProduct(id, data);
  }

  async removeProduct(id) {
    return await ProductRepository.deleteProduct(id);
  }
}

export default new ProductService();
