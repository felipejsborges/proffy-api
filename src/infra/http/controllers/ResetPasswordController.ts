import { Request, Response } from 'express';

import ResetPasswordService from '../../../domain/services/Users/ResetPasswordService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';

import JWTProvider from '../../providers/JWTProvider';
import BCryptHashProvider from '../../providers/BCryptHashProvider';

class ResetPasswordController {
	public async create(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const jwtProvider = new JWTProvider();
		const bCryptHashProvider = new BCryptHashProvider();

		const resetPassword = new ResetPasswordService(
			usersRepository,
			jwtProvider,
			bCryptHashProvider,
		);

		const query = request.query;
		const token = query.token as string;

		const { password } = request.body;

		await resetPassword.execute({ token, password });

		return response.status(204).send();
	}
}

export default ResetPasswordController;
