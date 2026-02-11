import { body } from "express-validator";

export const productValidator = [
  body("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isString().withMessage("El título debe ser texto"),
  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0"),
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero positivo"),
  body("category")
    .optional()
    .isString().withMessage("La categoría debe ser texto")
];
