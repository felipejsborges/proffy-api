import express from 'express';

import FavoriteClassesController from '../controllers/FavoriteClassesController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const favoriteClassesRoutes = express.Router();

const favoriteClassesController = new FavoriteClassesController();

favoriteClassesRoutes.post(
	'/favorite-classes/:class_id',
	ensureUserIsAuthenticated,
	favoriteClassesController.create,
);

favoriteClassesRoutes.get(
	'/favorite-classes',
	ensureUserIsAuthenticated,
	favoriteClassesController.index,
);

favoriteClassesRoutes.delete(
	'/favorite-classes/:class_id',
	ensureUserIsAuthenticated,
	favoriteClassesController.delete,
);

export default favoriteClassesRoutes;
