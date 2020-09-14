import express from 'express';

import ClassesController from '../controllers/ClassesController';
import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

const classesRoutes = express.Router();

const classesController = new ClassesController();

classesRoutes.get('/classes', classesController.index);
classesRoutes.post(
	'/classes',
	ensureUserIsAuthenticated,
	classesController.create,
);
classesRoutes.get('/classes/:class_id', classesController.show);

export default classesRoutes;
