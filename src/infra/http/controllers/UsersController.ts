import { Request, Response } from 'express';

import UsersRepository from '../../knex/repositories/UsersRepository';

import ListUsersService from '../../../domain/services/Users/ListUsersService';
import CreateUserService from '../../../domain/services/Users/CreateUserService';
import ShowUserService from '../../../domain/services/Users/ShowUserService';

const usersRepository = new UsersRepository();

export default class UsersController {
	async index(request: Request, response: Response): Promise<Response> {
		const listUsers = new ListUsersService(usersRepository);

		const users = await listUsers.execute();

		return response.status(200).json(users);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createUser = new CreateUserService(usersRepository);

		const { name, avatar, whatsapp, bio } = request.body;

		const user = await createUser.execute({
			name,
			avatar,
			whatsapp,
			bio,
		});

		return response.status(201).send(user);
	}

	async show(request: Request, response: Response): Promise<Response> {
		const showUser = new ShowUserService(usersRepository);

		const { user_id } = request.params;

		const user = await showUser.execute(Number(user_id));

		return response.status(200).json(user);
	}
}
