import express from 'express';

import AvatarsController from '../controllers/AvatarsController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import uploadHandler from '../middlewares/uploadHandler';

const avatarRoutes = express.Router();

const avatarsController = new AvatarsController();

avatarRoutes.patch(
	'/users/avatar',
	ensureUserIsAuthenticated,
	uploadHandler,
	avatarsController.update,
);

export default avatarRoutes;
