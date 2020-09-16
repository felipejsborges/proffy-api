import express from 'express';

import UsersController from '../controllers/UsersController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const userRoutes = express.Router();

const usersController = new UsersController();

userRoutes.get('/users', usersController.index);
userRoutes.post('/users', usersController.create);
userRoutes.put('/users', ensureUserIsAuthenticated, usersController.update);
userRoutes.get('/users/:user_id', usersController.show);

export default userRoutes;
