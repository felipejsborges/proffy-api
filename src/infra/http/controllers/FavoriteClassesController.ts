import { Request, Response } from 'express';

import FavoriteClassService from '../../../domain/services/Classes/FavoriteClassService';
import UnfavoriteClassService from '../../../domain/services/Classes/UnfavoriteClassService';
import ShowUserFavoriteClassesService from '../../../domain/services/Users/ShowUserFavoriteClassesService';

import FavoritedClassesRepository from '../../../infra/typeorm/repositories/FavoritedClassesRepository';

class FavoriteClassesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const favoritedClassesRepository = new FavoritedClassesRepository();
		const favoriteClass = new FavoriteClassService(favoritedClassesRepository);

		const user_id = request.user.id;

		const { class_id } = request.params;

		await favoriteClass.execute({ user_id, class_id });

		return response.status(204).send();
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const favoritedClassesRepository = new FavoritedClassesRepository();
		const showUserFavoriteClasses = new ShowUserFavoriteClassesService(
			favoritedClassesRepository,
		);

		const user_id = request.user.id;

		const userFavoritedClasses = await showUserFavoriteClasses.execute({
			user_id,
		});

		return response.status(200).json(userFavoritedClasses);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const favoritedClassesRepository = new FavoritedClassesRepository();
		const unfavoriteClass = new UnfavoriteClassService(
			favoritedClassesRepository,
		);

		const user_id = request.user.id;

		const { class_id } = request.params;

		await unfavoriteClass.execute({
			user_id,
			class_id,
		});

		return response.status(204).json();
	}
}

export default FavoriteClassesController;
