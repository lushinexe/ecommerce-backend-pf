import express from 'express';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

const router = express.Router();

// Listado de productos
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;
    const filter = query ? { category: query } : {};
    const options = { page, limit };
    if (sort) options.sort = { price: sort === 'asc' ? 1 : -1 };

    const result = await Product.paginate(filter, options);

    let cart = await Cart.findOne().lean();
    if (!cart) cart = await Cart.create({ products: [] });

    res.render('products', {
      payload: result.docs.map(doc => doc.toObject()),
      cart,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar productos");
  }
});

// Detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid).lean();
    const cart = await Cart.findOne().lean();
    if (!product) return res.status(404).send("Producto no encontrado");
    res.render('productDetail', { product, cart });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar detalle del producto");
  }
});

// Detalle del carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product').lean();
    if (!cart) return res.status(404).send("Carrito no encontrado");

    const total = cart.products.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.render('cartDetail', { cart, total });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar carrito");
  }
});

// Agregar producto al carrito
router.post('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const cart = await Cart.findById(cid);
    const existing = cart.products.find(p => p.product.toString() === pid);

    if (existing) {
      existing.quantity += parseInt(quantity);
    } else {
      cart.products.push({ product: pid, quantity: parseInt(quantity) });
    }

    await cart.save();
    res.redirect(`/carts/${cid}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar producto al carrito");
  }
});

export default router;
