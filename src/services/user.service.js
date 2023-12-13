import User from '../models/User.js';

class UserService {
  static async userExist(email) {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  static async createAccount({ name, email, password }) {
    return User.create({ name, email, password });
  }

  static async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async getUserById(userId) {
    return User.findByPk(userId);
  }
}

export default UserService;
