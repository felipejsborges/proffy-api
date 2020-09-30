import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

import createClassValidator from '../validators/classes/createClassValidator';
import queryParamsHandler from '../middlewares/queryParamsHandler';

import ClassesController from '../controllers/ClassesController';
import updateClassValidator from '../validators/classes/updateClassValidator';
import deleteClassValidator from '../validators/classes/deleteClassValidator';
import listClassesValidator from '../validators/classes/listClassesValidator';

const classesRoutes = express.Router();

const classesController = new ClassesController();

classesRoutes.get(
	'/classes',
	ensureUserIsAuthenticated,
	listClassesValidator,
	queryParamsHandler,
	classesController.index,
);

classesRoutes.post(
	'/classes',
	ensureUserIsAuthenticated,
	createClassValidator,
	classesController.create,
);

classesRoutes.put(
	'/classes/:class_id',
	ensureUserIsAuthenticated,
	updateClassValidator,
	classesController.update,
);

classesRoutes.delete(
	'/classes/:class_id',
	ensureUserIsAuthenticated,
	deleteClassValidator,
	classesController.delete,
);

export default classesRoutes;
