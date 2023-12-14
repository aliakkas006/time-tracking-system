import authService from '../services/auth.service.js';
import tokenService from '../services/token.service.js';

class AuthController {
  /**
   * ---- Register Controller ----
   */
  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await authService.register({ name, email, password });
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const accessToken = tokenService.generateAccessToken({ payload });

      const response = {
        code: 201,
        message: 'Account Created Successfully',
        data: {
          access_token: accessToken,
        },
        links: {
          self: req.url,
          login: '/api/v1/auth/login',
        },
      };

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * ---- Login Controller ----
   */
  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const { accessToken, refreshToken } = await authService.login({
        email,
        password,
        issuedIp: req.clientIp || 'N/A',
      });

      const response = {
        code: 200,
        message: 'Login successful',
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        links: {
          self: req.url,
        },
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * ---- Logout Controller ----
   */
  static async logout(req, res, next) {
    const { token } = req.body;

    try {
      await authService.logout({ token, clientIp: req.clientIp || 'N/A' });

      const response = {
        code: 204,
        message: 'Logout Successfully!',
        links: {
          self: req.url,
          login: `/api/v1/auth/login`,
        },
      };

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
