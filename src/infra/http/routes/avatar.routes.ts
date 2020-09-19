import express from 'express';

import AvatarsController from '../controllers/AvatarsController';

import ensureUserIsAuthenticated from '../middlewares/ensureUserIsAuthenticated';
import upload from '../../../config/upload';

const avatarRoutes = express.Router();

const avatarsController = new AvatarsController();

avatarRoutes.patch(
	'/users/avatar',
	ensureUserIsAuthenticated,
	upload,
	avatarsController.update,
);

export default avatarRoutes;
