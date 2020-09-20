import express from 'express';

import usersRoutes from './users.routes';
import avatarRoutes from './avatar.routes';
import passwordRoutes from './password.routes';
import sessionRoutes from './sessions.routes';
import classesRoutes from './classes.routes';
import classesSchedulesRoutes from './classesSchedules.routes';
import connectionsRoutes from './connections.routes';

const routes = express.Router();

routes.use(usersRoutes);
routes.use(avatarRoutes);
routes.use(passwordRoutes);
routes.use(sessionRoutes);
routes.use(classesRoutes);
routes.use(classesSchedulesRoutes);
routes.use(connectionsRoutes);

export default routes;
