import express from 'express';

import ClassesSchedulesController from '../controllers/ClassesSchedulesController';

const classesSchedulesRoutes = express.Router();

const classesSchedulesController = new ClassesSchedulesController();

classesSchedulesRoutes.post(
	'/classes/:class_id/class_schedules',
	classesSchedulesController.create,
);

export default classesSchedulesRoutes;
