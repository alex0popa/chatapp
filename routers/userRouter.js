import { Router } from 'express';
import { loggedin, login, logout, register } from '../controllers/auth.js';

export const userRouter = Router();

userRouter.route('/').post(login);

userRouter.route('/register').post(register);

userRouter.route('/logout').get(logout);

userRouter.route('/loggedin').get(loggedin);

// TODO on next version modify password or userName