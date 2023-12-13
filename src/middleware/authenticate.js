import User from '../models/User.js';
import tokenService from '../services/token.service.js';
import userService from '../services/user.service.js';
import { authenticationError } from '../utils/error.js';

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = tokenService.verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    if (!user) next(authenticationError());

    const userModel = await User.findOne({ where: { email: decoded.email } });

    if (!userModel) {
      return next(authenticationError());
    }
    
    req.user = { ...userModel.toJSON(), id: userModel.id };

    next();
  } catch (err) {
    next(authenticationError());
  }
};

export default authenticate;
