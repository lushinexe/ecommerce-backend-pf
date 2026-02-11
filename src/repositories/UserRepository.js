import UserDAO from "../dao/UserDAO.js";

class UserRepository {
  async findUserByEmail(email) {
    return await UserDAO.getByEmail(email);
  }

  async registerUser(userData) {
    return await UserDAO.create(userData);
  }

  async changePassword(userId, newPassword) {
    return await UserDAO.updatePassword(userId, newPassword);
  }
}

export default new UserRepository();
