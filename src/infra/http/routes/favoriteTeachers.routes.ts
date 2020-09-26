import express from 'express';

import FavoriteTeachersController from '../controllers/FavoriteTeachersController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const favoriteTeachersRoutes = express.Router();

const favoriteTeachersController = new FavoriteTeachersController();

favoriteTeachersRoutes.post(
	'/favorite-teachers/:teacher_id',
	ensureUserIsAuthenticated,
	favoriteTeachersController.create,
);

favoriteTeachersRoutes.get(
	'/favorite-teachers',
	ensureUserIsAuthenticated,
	favoriteTeachersController.index,
);

favoriteTeachersRoutes.delete(
	'/favorite-teachers/:teacher_id',
	ensureUserIsAuthenticated,
	favoriteTeachersController.delete,
);

export default favoriteTeachersRoutes;
