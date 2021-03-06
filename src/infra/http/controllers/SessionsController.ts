import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import AuthenticateUserService from '../../../domain/services/Users/AuthenticateUserService';
import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '../../providers/BCryptHashProvider';
import JWTProvider from '../../providers/JWTProvider';

class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const usersRepository = new UsersRepository();
		const jwtProvider = new JWTProvider();
		const bCryptHashProvider = new BCryptHashProvider();
		const authenticateUser = new AuthenticateUserService(
			usersRepository,
			jwtProvider,
			bCryptHashProvider,
		);

		const user = await authenticateUser.execute({ email, password });

		return response.status(201).send(classToClass(user));
	}
}

export default SessionsController;
