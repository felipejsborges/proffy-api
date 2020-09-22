import express from 'express';

import FavoriteTeachersController from '../controllers/FavoriteTeachersController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const favoriteTeachersRoutes = express.Router();

const favoriteTeachersController = new FavoriteTeachersController();

favoriteTeachersRoutes.use(ensureUserIsAuthenticated);

favoriteTeachersRoutes.post(
	'/favorite-teachers/:teacher_id',
	favoriteTeachersController.create,
);

favoriteTeachersRoutes.get(
	'/favorite-teachers',
	favoriteTeachersController.index,
);

// favoriteTeachersRoutes.delete('/favorite-teachers/:teacher_id', favoriteTeachersController.delete);

export default favoriteTeachersRoutes;
