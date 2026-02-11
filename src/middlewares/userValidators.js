import { body } from "express-validator";

export const registerValidator = [
  body("first_name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto"),
  body("last_name")
    .notEmpty().withMessage("El apellido es obligatorio")
    .isString().withMessage("El apellido debe ser texto"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("age")
    .optional()
    .isInt({ min: 0 }).withMessage("La edad debe ser un número positivo"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'")
];

export const loginValidator = [
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
];
