import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

import createUserValidator from '../validators/users/createUserValidator';
import updateUserValidator from '../validators/users/updateUserValidator';
import showUserValidator from '../validators/users/showUserValidator';

import UsersController from '../controllers/UsersController';

const userRoutes = express.Router();

const usersController = new UsersController();

userRoutes.post('/users', createUserValidator, usersController.create);
userRoutes.put(
	'/users',
	ensureUserIsAuthenticated,
	updateUserValidator,
	usersController.update,
);
userRoutes.get('/users/:user_id', showUserValidator, usersController.show);

export default userRoutes;
