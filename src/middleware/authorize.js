import { authorizationError } from '../utils/error.js';

const authorize =
  (roles = ['admin']) =>
  (req, _res, next) => {
    if (roles.includes(req.user.role) && req.user.status === 'approved') {
      next();
    } else {
      next(authorizationError());
    }
  };

export default authorize;
