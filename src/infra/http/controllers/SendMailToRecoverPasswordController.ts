import { Request, Response } from 'express';

import SendEmailToRecoverPasswordService from '../../../domain/services/Users/SendEmailToRecoverPasswordService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';

import EtherealMailProvider from '../../providers/EtherealMailProvider';
import HandlebarsMailTemplateProvider from '../../providers/HandlebarsMailTemplateProvider';
import JWTProvider from '../../providers/JWTProvider';

class SendMailToRecoverPasswordController {
	public async create(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();
		const etherealMailProvider = new EtherealMailProvider(
			handlebarsMailTemplateProvider,
		);
		const jwtProvider = new JWTProvider();

		const sendEmailToRecoverPassword = new SendEmailToRecoverPasswordService(
			usersRepository,
			etherealMailProvider,
			jwtProvider,
		);

		const { email } = request.body;

		await sendEmailToRecoverPassword.execute({ email });

		return response.status(204).send();
	}
}

export default SendMailToRecoverPasswordController;
