import express from 'express';

import SendMailToRecoverPasswordController from '../controllers/SendMailToRecoverPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRoutes = express.Router();

const sendMailToRecoverPasswordController = new SendMailToRecoverPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
	'/password/recover',
	sendMailToRecoverPasswordController.create,
);

passwordRoutes.post('/password/reset', resetPasswordController.create);

export default passwordRoutes;
