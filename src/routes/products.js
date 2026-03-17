import express from "express";
import ProductController from "../controllers/ProductController.js";
import passport from "../config/passport.js";
import { authorization } from "../middlewares/authorization.js";
import { productValidator } from "../middlewares/validators.js";
import { validationHandler } from "../middlewares/validationHandler.js";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - stock
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           example: "Polera manga corta"
 *         description:
 *           type: string
 *           example: "Polera de algodón"
 *         price:
 *           type: number
 *           example: 4500
 *         stock:
 *           type: integer
 *           example: 10
 *         category:
 *           type: string
 *           example: "ropa"
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Listar todos los productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *
 *   post:
 *     summary: Crear un nuevo producto (solo admin)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 *       403:
 *         description: No autorizado
 */

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto por ID (solo admin)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 *
 *   delete:
 *     summary: Eliminar producto por ID (solo admin)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */

router.get("/", (req, res) => ProductController.list(req, res));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  productValidator,
  validationHandler,
  (req, res) => ProductController.create(req, res)
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  productValidator,
  validationHandler,
  (req, res) => ProductController.update(req, res)
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  (req, res) => ProductController.delete(req, res)
);

export default router;
