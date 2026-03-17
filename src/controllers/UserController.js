import UserService from "../services/UserService.js";
import jwt from "jsonwebtoken";

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validación rápida
      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }

      const user = await UserService.login(email, password);
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user._id, role: user.role }, // incluir rol puede ser útil
        process.env.JWT_SECRET || "claveSecreta",
        { expiresIn: "1h" }
      );

      res.json({ status: "success", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
