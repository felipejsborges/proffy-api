import express from 'express';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import uploadHandler from '../middlewares/uploadHandler';

import AvatarsController from '../controllers/AvatarsController';

const avatarRoutes = express.Router();

const avatarsController = new AvatarsController();

avatarRoutes.patch(
	'/users/avatar',
	ensureUserIsAuthenticated,
	uploadHandler,
	avatarsController.update,
);

export default avatarRoutes;
