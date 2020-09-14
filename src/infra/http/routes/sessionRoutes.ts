import express from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionRoutes = express.Router();

const sessionsController = new SessionsController();

sessionRoutes.post('/sessions', sessionsController.create);

export default sessionRoutes;
