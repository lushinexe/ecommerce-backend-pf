import { body, param } from "express-validator";

// ✅ Validador para crear carrito
export const createCartValidator = [
  body("products")
    .optional()
    .isArray().withMessage("Los productos deben ser un arreglo"),
  body("products.*.product")
    .optional()
    .isMongoId().withMessage("El ID del producto debe ser válido"),
  body("products.*.quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0")
];

// ✅ Validador para agregar producto al carrito
export const addProductValidator = [
  param("cid")
    .isMongoId().withMessage("El ID del carrito debe ser válido"),
  param("pid")
    .isMongoId().withMessage("El ID del producto debe ser válido"),
  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0")
];
