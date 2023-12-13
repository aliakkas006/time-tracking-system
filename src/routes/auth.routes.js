import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter
  .post('/auth/register', authController.register)
  .get('/auth/login', authController.login)
  .post('/auth/logout', authController.logout);

export default authRouter;
