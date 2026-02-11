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
      const user = await UserService.login(req.body.email, req.body.password);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
