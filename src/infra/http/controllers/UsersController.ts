import { Request, Response } from 'express';

import CreateUserService from '../../../domain/services/Users/CreateUserService';
import UpdateUserService from '../../../domain/services/Users/UpdateUserService';
import ShowUserService from '../../../domain/services/Users/ShowUserService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';

class UsersController {
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

		return response.status(201).json(user);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const updateUser = new UpdateUserService(usersRepository);

		const {
			name,
			email,
			old_password,
			new_password,
			password_confirmation,
			whatsapp,
			bio,
		} = request.body;

		const user_id = request.user.id;

		const user = await updateUser.execute({
			user_id,
			name,
			old_password,
			new_password,
			password_confirmation,
			email,
			whatsapp,
			bio,
		});

		return response.status(200).json(user);
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
