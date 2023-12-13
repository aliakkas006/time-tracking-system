import userService from './user.service.js';
import tokenService from './token.service.js';
import { badRequest } from '../utils/error.js';
import { generateHash, hashMatched } from '../utils/hashing.js';
import User from '../models/User.js';

class AuthService {
  static async register({ name, email, password }) {
    const hasUser = await userService.userExist(email);
    if (hasUser) throw badRequest('User Already Exist');

    password = await generateHash(password);
    const user = await userService.createAccount({ name, email, password });

    return user;
  }

  static async login({ email, password, issuedIp }) {
    const user = await userService.findUserByEmail(email);
    if (!user) throw badRequest('Invalid Credentials!');

    const matched = await hashMatched(password, user.password);
    if (!matched) throw badRequest('Invalid Credentials!');

    // generate access token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = tokenService.generateAccessToken({ payload });

    // generate refresh token
    const refreshToken = await tokenService.generateRefreshToken({
      userId: user.id,
      issuedIp,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // For the second time login after the user logged out - update the user status (approved)
    if (user.status === 'blocked') {
      user.status = 'approved';
      await user.save();
    }

    return { accessToken, refreshToken };
  }

  static async logout({ token, clientIp }) {
    // revoke (invalidate) the refresh token
    const rToken = await tokenService.revokeRefreshToken({ token, clientIp });

    // Find the user and blocked the user status
    const user = await User.findByPk(rToken.userId);
    if (user) {
      user.status = 'blocked';
      await user.save();
    }
  }
}

export default AuthService;
