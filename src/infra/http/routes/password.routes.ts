import express from 'express';

import SendMailToRecoverPasswordController from '../controllers/SendMailToRecoverPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

import recoverPasswordValidator from '../validators/users/recoverPasswordValidator';
import resetPasswordValidator from '../validators/users/resetPasswordValidator';

const passwordRoutes = express.Router();

const sendMailToRecoverPasswordController = new SendMailToRecoverPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
	'/password/recover',
	recoverPasswordValidator,
	sendMailToRecoverPasswordController.create,
);

passwordRoutes.post(
	'/password/reset',
	resetPasswordValidator,
	resetPasswordController.create,
);

export default passwordRoutes;
