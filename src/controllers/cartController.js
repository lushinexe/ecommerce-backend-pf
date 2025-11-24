import Cart from '../models/Cart.js';

// GET carrito con populate
export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// DELETE producto específico del carrito
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.json({ status: "success", message: "Producto eliminado", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// PUT actualizar todos los productos del carrito
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; // arreglo de productos [{ product, quantity }]
    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// PUT actualizar cantidad de un producto
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) return res.status(404).json({ status: "error", message: "Producto no está en el carrito" });

    productInCart.quantity = quantity;
    await cart.save();

    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// DELETE vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();

    res.json({ status: "success", message: "Carrito vaciado", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
