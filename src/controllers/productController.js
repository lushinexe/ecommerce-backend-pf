import Product from '../models/Product.js';

// GET con filtros/paginación
export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === 'available') filter.available = true;
      else filter.category = query;
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };

    const result = await Product.paginate(filter, options);

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
};

// POST crear producto
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// PUT actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
