import CartDAO from "../dao/CartDAO.js";

class CartRepository {
  async getAllCarts() {
    return await CartDAO.getAll();
  }

  async getCartById(id) {
    return await CartDAO.getById(id);
  }

  async createCart(data) {
    return await CartDAO.create(data);
  }

  async updateCart(id, data) {
    return await CartDAO.update(id, data);
  }

  async deleteCart(id) {
    return await CartDAO.delete(id);
  }
}

export default new CartRepository();
