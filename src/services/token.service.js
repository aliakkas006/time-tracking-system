import jwt from 'jsonwebtoken';
import { addDays } from 'date-fns';
import RefreshToken from '../models/RefreshToken.js';
import { authenticationError, serverError } from '../utils/error.js';

class TokenService {
  static generateAccessToken({
    payload,
    secret = process.env.ACCESS_TOKEN_SECRET,
    algorithm = 'HS256',
    expiresIn = '3h',
  }) {
    try {
      return jwt.sign(payload, secret, { algorithm, expiresIn });
    } catch (err) {
      console.log('[JWT]', err);
      throw serverError();
    }
  }

  decodeToken({ token, algorithm = 'HS256' }) {
    try {
      return jwt.decode(token, algorithm);
    } catch (err) {
      console.log('[JWT]', err);
      throw serverError();
    }
  }

  static verifyToken({
    token,
    secret = process.env.ACCESS_TOKEN_SECRET,
    algorithm = 'HS256',
  }) {
    try {
      return jwt.verify(token, secret, { algorithms: [algorithm] });
    } catch (err) {
      console.log('[JWT]', err);
      throw serverError();
    }
  }

  static async generateRefreshToken({
    userId,
    issuedIp,
    name = '',
    email = '',
    role = 'user',
  }) {
    try {
      const refreshToken = await RefreshToken.create({
        user: userId,
        issuedIp,
        token: '',
        expiredAt: addDays(new Date(), 30),
      });

      const payload = {
        id: refreshToken.id,
        user: userId,
        name,
        email,
        role,
      };

      const rToken = this.generateAccessToken({
        payload,
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '30d',
      });

      refreshToken.token = rToken;
      await refreshToken.save();

      return rToken;
    } catch (error) {
      console.log('[TokenService] Error generating refresh token:', error);
      throw serverError();
    }
  }

  static async findRefreshToken(token) {
    try {
      const decoded = this.verifyToken({
        token,
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '30d',
      });

      return RefreshToken.findByPk(decoded.id);
    } catch (error) {
      console.log('[TokenService] Error finding refresh token:', error);
      throw serverError();
    }
  }

  static async revokeRefreshToken({ token, clientIp }) {
    try {
      const refreshToken = await this.findRefreshToken(token);
      if (!refreshToken || !refreshToken.isActive)
        throw authenticationError('Invalid Token!');

      refreshToken.revokedAt = new Date();
      refreshToken.revokedIp = clientIp;

      return refreshToken.save();
    } catch (error) {
      console.log('[TokenService] Error revoking refresh token:', error);
      throw serverError();
    }
  }

  // Rotate refresh token
  static async rotateRefreshToken({ token, clientIp }) {
    const decoded = this.verifyToken({
      token,
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    });

    // revoked old refresh token
    await this.revokeRefreshToken({ token, clientIp });

    // generate a new refresh token
    const refreshToken = await this.generateRefreshToken({
      userId: decoded.user,
      issuedIp: clientIp,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    });

    // generate a new access token
    const payload = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    const accessToken = this.generateAccessToken({
      payload,
      expiresIn: '3h',
    });

    return { accessToken, refreshToken };
  }

  // Check refresh token validity
  static async checkRefreshTokenValidity(token) {
    const refreshToken = await this.findRefreshToken(token);
    if (!refreshToken || !refreshToken.isActive)
      throw authenticationError('Invalid Token');
    else return true;
  }
}

export default TokenService;
