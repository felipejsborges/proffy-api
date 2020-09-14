import express from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRoutes = express.Router();

const connectionsController = new ConnectionsController();

connectionsRoutes.get('/connections', connectionsController.index);
connectionsRoutes.post('/connections', connectionsController.create);

export default connectionsRoutes;
