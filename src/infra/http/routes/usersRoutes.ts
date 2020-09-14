import express from 'express';

import UsersController from '../controllers/UsersController';

const userRoutes = express.Router();

const usersController = new UsersController();

userRoutes.get('/users', usersController.index);
userRoutes.post('/users', usersController.create);
userRoutes.get('/users/:user_id', usersController.show);

export default userRoutes;
