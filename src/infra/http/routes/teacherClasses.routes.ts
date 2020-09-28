import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';

import showTeacherClassesValidator from '../validators/classes/showTeacherClassesValidator';

import TeacherClassesController from '../controllers/TeacherClassesController';

const teacherClassesRoutes = express.Router();

const teacherClassesController = new TeacherClassesController();

teacherClassesRoutes.get(
	'/teacher-classes',
	ensureUserIsAuthenticated,
	showTeacherClassesValidator,
	teacherClassesController.index,
);

export default teacherClassesRoutes;
