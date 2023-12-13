import tokenService from '../services/token.service.js';
import userService from '../services/user.service.js';
import { authenticationError } from '../utils/error.js';

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    const decoded = tokenService.verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    if (!user) next(authenticationError());
    if (user.status !== 'approved')
      next(authenticationError(`Your account is ${user.status}`));

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (err) {
    next(authenticationError());
  }
};

export default authenticate;
