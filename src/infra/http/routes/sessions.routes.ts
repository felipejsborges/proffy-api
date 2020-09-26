import express from 'express';

import SessionsController from '../controllers/SessionsController';

import loginValidator from '../validators/users/loginValidator';

const sessionRoutes = express.Router();

const sessionsController = new SessionsController();

sessionRoutes.post('/sessions', loginValidator, sessionsController.create);

export default sessionRoutes;
