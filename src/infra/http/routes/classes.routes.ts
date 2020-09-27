import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

import createClassValidator from '../validators/classes/createClassValidator';
import showClassValidator from '../validators/classes/showClassValidator';
import queryParamsHandler from '../middlewares/queryParamsHandler';

import ClassesController from '../controllers/ClassesController';

const classesRoutes = express.Router();

const classesController = new ClassesController();

classesRoutes.get(
	'/classes',
	ensureUserIsAuthenticated,
	queryParamsHandler,
	classesController.index,
);

classesRoutes.post(
	'/classes',
	ensureUserIsAuthenticated,
	createClassValidator,
	classesController.create,
);

classesRoutes.get(
	'/classes/:class_id',
	ensureUserIsAuthenticated,
	showClassValidator,
	classesController.show,
);

export default classesRoutes;
