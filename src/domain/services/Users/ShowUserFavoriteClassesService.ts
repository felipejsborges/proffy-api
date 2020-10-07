import FavoritedClass from '../../models/FavoritedClass';
import iFavoritedClassesRepository from '../../repositories/iFavoritedClassesRepository';

interface Request {
	user_id: string;
}

class ShowUserFavoriteClassesService {
	constructor(
		private favoritedClassesRepository: iFavoritedClassesRepository,
	) {}

	public async execute({
		user_id,
	}: Request): Promise<FavoritedClass[] | undefined> {
		const favoritedClasses = await this.favoritedClassesRepository.findAllByUserId(
			user_id,
		);

		return favoritedClasses;
	}
}

export default ShowUserFavoriteClassesService;
