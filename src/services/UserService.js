import UserDAO from "../dao/UserDAO.js";
import bcrypt from "bcrypt";

class UserService {
  async register(userData) {
    const { email, password, first_name, last_name, age } = userData;

    const existingUser = await UserDAO.getByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // 🔑 Encriptar contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await UserDAO.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      age,
      role: userData.role
    });

    return {
      id: newUser._id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      age: newUser.age,
      role: newUser.role
    };
  }

  async login(email, password) {
    const user = await UserDAO.getByEmail(email);
    if (!user) {
      return null;
    }

    // 🔑 Comparar contraseña con bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}

export default new UserService();
