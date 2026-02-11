import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  age:        { type: Number },
  role:       { type: String, default: "user" }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

// Creamos el modelo
const UserModel = mongoose.model("User", userSchema);

class UserDAO {
  static async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  static async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  static async getById(id) {
    return await UserModel.findById(id);
  }
}

export default UserDAO;
