import { Request, Response } from 'express';

import ListUsersService from '../services/Users/ListUsersService';
import CreateUserService from '../services/Users/CreateUserService';
import ShowUserService from '../services/Users/ShowUserService';

export default class UsersController {
	async index(request: Request, response: Response): Promise<Response> {
		const listUsers = new ListUsersService();

		const users = await listUsers.execute();

		return response.json(users);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createUser = new CreateUserService();

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
		const showUser = new ShowUserService();

		const { user_id } = request.params;

		const user = await showUser.execute(Number(user_id));

		return response.json(user);
	}
}
