import { Request, Response } from 'express';

import ListUsersService from '../../../domain/services/Users/ListUsersService';
import CreateUserService from '../../../domain/services/Users/CreateUserService';
import ShowUserService from '../../../domain/services/Users/ShowUserService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';

class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const listUsers = new ListUsersService(usersRepository);

		const users = await listUsers.execute();

		return response.status(200).json(users);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const createUser = new CreateUserService(usersRepository);

		const { name, email, password, avatar, whatsapp, bio } = request.body;

		const user = await createUser.execute({
			name,
			email,
			password,
			avatar,
			whatsapp,
			bio,
		});

		return response.status(201).send(user);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const showUser = new ShowUserService(usersRepository);

		const { user_id } = request.params;

		const user = await showUser.execute({ user_id });

		return response.status(200).json(user);
	}
}

export default UsersController;
