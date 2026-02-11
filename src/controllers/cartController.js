import CartService from "../services/CartService.js";

class CartController {
  async list(req, res) {
    try {
      const carts = await CartService.listCarts();
      res.json({ status: "success", carts });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async get(req, res) {
    try {
      const cart = await CartService.getCart(req.params.id);
      if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const cart = await CartService.createCart(req.body);
      res.status(201).json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await CartService.addProduct(cid, pid, quantity || 1);
      if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const cart = await CartService.removeCart(req.params.id);
      if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      res.json({ status: "success", message: "Carrito eliminado" });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  // 🔹 Nuevo: eliminar un producto específico del carrito
  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartService.removeProduct(cid, pid);
      if (!cart) return res.status(404).json({ status: "error", message: "Carrito o producto no encontrado" });
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  // 🔹 Nuevo: vaciar todos los productos del carrito
  async clearProducts(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.clearProducts(cid);
      if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      res.json({ status: "success", cart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }
  async purchase(req, res) {
    try {
      const { cid } = req.params;
      const userEmail = req.user.email; // viene del JWT
      const ticket = await CartService.purchaseCart(cid, userEmail);

      if (!ticket) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

      res.json({ status: "success", ticket });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default new CartController();

