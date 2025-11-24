import express from 'express';
import { getProducts, createProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// Rutas de productos
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export default router;   // ✅ Exportación por defecto
