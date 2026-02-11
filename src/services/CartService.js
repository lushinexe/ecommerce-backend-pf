import CartRepository from "../repositories/CartRepository.js";
import ProductRepository from "../repositories/ProductRepository.js"; // ✅ faltaba este
import Ticket from "../models/Ticket.js"; // ✅ para crear tickets
import { v4 as uuidv4 } from "uuid"; // ✅ para generar código único


class CartService {
  async listCarts() {
    return await CartRepository.getAllCarts();
  }

  async getCart(id) {
    return await CartRepository.getCartById(id);
  }

  async createCart(data) {
    return await CartRepository.createCart(data);
  }

  async addProduct(cartId, productId, quantity) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) return null;

    // Buscar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => {
      const prodId = p.product?._id ? p.product._id.toString() : p.product.toString();
      return prodId === productId;
    });

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await CartRepository.updateCart(cartId, cart);
  }

  async removeCart(id) {
    return await CartRepository.deleteCart(id);
  }

  // 🔹 Nuevo: eliminar un producto específico del carrito
  async removeProduct(cartId, productId) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(p => {
      const prodId = p.product?._id ? p.product._id.toString() : p.product.toString();
      return prodId !== productId;
    });

    return await CartRepository.updateCart(cartId, cart);
  }

  // 🔹 Nuevo: vaciar todos los productos del carrito
  async clearProducts(cartId) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) return null;

    cart.products = []; // vaciar array
    return await CartRepository.updateCart(cartId, cart);
  }
    // ...otros métodos

  async purchaseCart(cartId, userEmail) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) return null;

    let totalAmount = 0;
    const productsToPurchase = [];

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductRepository.updateProduct(product._id, product);
        totalAmount += product.price * item.quantity;
        productsToPurchase.push(item);
      } else {
        // Si no hay stock suficiente, se omite ese producto
      }
    }

    // Vaciar carrito después de compra
    cart.products = [];
    await CartRepository.updateCart(cartId, cart);

    // Crear ticket
    const ticket = await Ticket.create({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: userEmail
    });

    return ticket;
  }
  
}

export default new CartService();

