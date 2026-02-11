import express from "express";
import CartController from "../controllers/CartController.js";
import passport from "../config/passport.js";
import { authorization } from "../middlewares/authorization.js";
import { createCartValidator, addProductValidator } from "../middlewares/cartValidators.js";
import { validationHandler } from "../middlewares/validationHandler.js";

const router = express.Router();

/**
 * @openapi
 * /api/carts:
 *   get:
 *     summary: Listar todos los carritos (solo admin)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Lista de carritos }
 *
 *   post:
 *     summary: Crear un nuevo carrito (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product: { type: string }
 *                     quantity: { type: integer }
 *     responses:
 *       201: { description: Carrito creado }
 *       400: { description: Error de validación }
 */

/**
 * @openapi
 * /api/carts/{id}:
 *   get:
 *     summary: Obtener carrito por ID (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Carrito encontrado }
 *       404: { description: Carrito no encontrado }
 *
 *   delete:
 *     summary: Eliminar carrito por ID (solo admin)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Carrito eliminado }
 *       404: { description: Carrito no encontrado }
 */

/**
 * @openapi
 * /api/carts/{cid}/products/{pid}:
 *   post:
 *     summary: Agregar producto al carrito (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: pid
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity: { type: integer }
 *     responses:
 *       200: { description: Producto agregado al carrito }
 *       400: { description: Error de validación }
 *       404: { description: Carrito o producto no encontrado }
 *
 *   delete:
 *     summary: Eliminar producto específico del carrito (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: pid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Producto eliminado del carrito }
 *       404: { description: Carrito o producto no encontrado }
 */

/**
 * @openapi
 * /api/carts/{cid}/products:
 *   delete:
 *     summary: Vaciar todos los productos del carrito (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Carrito vaciado }
 *       404: { description: Carrito no encontrado }
 */

/**
 * @openapi
 * /api/carts/{cid}/purchase:
 *   post:
 *     summary: Finalizar compra y generar ticket (solo user autenticado)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Ticket generado }
 *       404: { description: Carrito no encontrado }
 */

router.get("/", passport.authenticate("jwt", { session: false }), authorization("admin"), (req, res) => CartController.list(req, res));
router.get("/:id", passport.authenticate("jwt", { session: false }), authorization("user"), (req, res) => CartController.get(req, res));
router.post("/", passport.authenticate("jwt", { session: false }), authorization("user"), createCartValidator, validationHandler, (req, res) => CartController.create(req, res));
router.post("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), authorization("user"), addProductValidator, validationHandler, (req, res) => CartController.addProduct(req, res));
router.delete("/:id", passport.authenticate("jwt", { session: false }), authorization("admin"), (req, res) => CartController.delete(req, res));

// 🔹 Nuevas rutas
router.delete("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), authorization("user"), (req, res) => CartController.removeProduct(req, res));
router.delete("/:cid/products", passport.authenticate("jwt", { session: false }), authorization("user"), (req, res) => CartController.clearProducts(req, res));
router.post("/:cid/purchase", passport.authenticate("jwt", { session: false }), authorization("user"), (req, res) => CartController.purchase(req, res));

export default router;
