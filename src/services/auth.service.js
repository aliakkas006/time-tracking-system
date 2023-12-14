import userService from './user.service.js';
import tokenService from './token.service.js';
import { badRequest } from '../utils/error.js';
import { generateHash, hashMatched } from '../utils/hashing.js';

/**
 * @class AuthService
 * @classdesc Handles authentication-related operations such as user registration, login, and logout.
 */
class AuthService {
  /**
   * ---- Create for user registering -----
   */
  static async register({ name, email, password }) {
    const hasUser = await userService.userExist(email);
    if (hasUser) throw badRequest('User Already Exist');

    password = await generateHash(password);
    const user = await userService.createAccount({ name, email, password });

    return user;
  }

  /**
   * ---- Login for user -----
   */
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

    return { accessToken, refreshToken };
  }

  /**
   * ---- Logout for user -----
   */
  static async logout({ token, clientIp }) {
    // revoke (invalidate) the refresh token
    const rToken = await tokenService.revokeRefreshToken({ token, clientIp });
    return rToken;
  }
}

export default AuthService;
