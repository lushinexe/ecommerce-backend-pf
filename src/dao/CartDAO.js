import CartModel from "../models/Cart.js";

class CartDAO {
  async getAll() {
    return await CartModel.find().populate("products.product");
  }

  async getById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async create(cartData) {
    return await CartModel.create(cartData);
  }

  async update(id, data) {
    return await CartModel.findByIdAndUpdate(id, data, { new: true }).populate("products.product");
  }

  async delete(id) {
    return await CartModel.findByIdAndDelete(id);
  }
}

export default new CartDAO();
