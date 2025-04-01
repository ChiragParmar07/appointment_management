import express from 'express';
import { registerUsers } from '../../controllers/users/users.controller';

export const userRouter = express.Router();

userRouter.post('/register', registerUsers);

userRouter.post('/login');

userRouter.post('/forgot-password');

userRouter.post('/reset-password');

userRouter.post('/change-password');

userRouter.post('/verify-email');

userRouter.get('/resend-email-verification-token');

userRouter.post('/update-profile');

userRouter.post('/logout');

userRouter.post('/me');
