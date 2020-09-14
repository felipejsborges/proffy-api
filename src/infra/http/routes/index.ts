import express from 'express';

import usersRoutes from './usersRoutes';
import sessionRoutes from './sessionRoutes';
import classesRoutes from './classesRoutes';
import classesSchedulesRoutes from './classesSchedulesRoutes';
import connectionsRoutes from './connectionsRoutes';

const routes = express.Router();

routes.use(usersRoutes);
routes.use(sessionRoutes);
routes.use(classesRoutes);
routes.use(classesSchedulesRoutes);
routes.use(connectionsRoutes);

export default routes;
