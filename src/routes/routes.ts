import express from 'express';
import { userRouter } from './users/users.route';
import { doctorRouter } from './doctors/doctors.route';

export const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/doctors', doctorRouter);
