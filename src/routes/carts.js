import mongoose from 'mongoose';
import express from 'express';
import {
    getCartById,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/:cid', getCartById);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ]
});


export default router;
