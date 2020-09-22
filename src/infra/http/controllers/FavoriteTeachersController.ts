import { Request, Response } from 'express';

import FavoriteTeacherService from '../../../domain/services/Users/FavoriteTeacherService';
import ShowUserFavoriteTeachersService from '../../../domain/services/Users/ShowUserFavoriteTeachersService';

import FavoritedTeachersRepository from '../../../infra/typeorm/repositories/FavoritedTeachersRepository';

class ConnectionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const favoritedTeachersRepository = new FavoritedTeachersRepository();
		const favoriteTeacher = new FavoriteTeacherService(
			favoritedTeachersRepository,
		);

		const user_id = request.user.id;

		const { teacher_id } = request.params;

		const total = await favoriteTeacher.execute({ user_id, teacher_id });

		return response.status(200).json(total);
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const favoritedTeachersRepository = new FavoritedTeachersRepository();
		const showUserFavoriteTeachers = new ShowUserFavoriteTeachersService(
			favoritedTeachersRepository,
		);

		const user_id = request.user.id;

		const userFavoritedTeachers = await showUserFavoriteTeachers.execute({
			user_id,
		});

		return response.status(200).json(userFavoritedTeachers);
	}

	// public async delete(
	// 	request: Request,
	// 	response: Response,
	// ): Promise<Response> {}
}

export default ConnectionsController;
