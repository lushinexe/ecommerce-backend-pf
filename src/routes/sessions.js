import express from "express";
import UserController from "../controllers/UserController.js";
import passport from "passport";
import UserDTO from "../dto/UserDTO.js";
import { registerValidator, loginValidator } from "../middlewares/userValidators.js";
import { validationHandler } from "../middlewares/validationHandler.js";

const router = express.Router();

/**
 * @openapi
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post(
  "/register",
  registerValidator,   // 👈 array de middlewares
  validationHandler,   // 👈 middleware que usa next()
  (req, res) => UserController.register(req, res)
);

/**
 * @openapi
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
  "/login",
  loginValidator,
  validationHandler,
  (req, res) => UserController.login(req, res)
);

/**
 * @openapi
 * /api/sessions/current:
 *   get:
 *     summary: Obtener usuario autenticado
 *     tags:
 *       - Sessions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Token inválido o ausente
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const safeUser = new UserDTO(req.user);
    res.json(safeUser);
  }
);

export default router;
