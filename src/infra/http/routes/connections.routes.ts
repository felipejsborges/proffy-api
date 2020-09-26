import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import createConnectionValidator from '../validators/connections/createConnectionValidator';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRoutes = express.Router();

const connectionsController = new ConnectionsController();

connectionsRoutes.get('/connections', connectionsController.index);
connectionsRoutes.post(
	'/connections',
	ensureUserIsAuthenticated,
	createConnectionValidator,
	connectionsController.create,
);

export default connectionsRoutes;
