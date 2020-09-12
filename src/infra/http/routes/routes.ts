import express from 'express';

import UsersController from '../controllers/UsersController';
import ClassesController from '../controllers/ClassesController';
import ClassesSchedulesController from '../controllers/ClassesSchedulesController';
import ConnectionsController from '../controllers/ConnectionsController';

const routes = express.Router();

const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const classesSchedulesController = new ClassesSchedulesController();

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);
routes.get('/users/:user_id', usersController.show);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.get('/classes/:class_id', classesController.show);

routes.post(
	'/classes/:class_id/class_schedules',
	classesSchedulesController.create,
);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
