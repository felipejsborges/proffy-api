import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

import createClassScheduleValidator from '../validators/classesSchedules/createClassScheduleValidator';

import ClassesSchedulesController from '../controllers/ClassesSchedulesController';

const classesSchedulesRoutes = express.Router();

const classesSchedulesController = new ClassesSchedulesController();

classesSchedulesRoutes.post(
	'/classes/:class_id/class_schedules',
	ensureUserIsAuthenticated,
	createClassScheduleValidator,
	classesSchedulesController.create,
);

export default classesSchedulesRoutes;
