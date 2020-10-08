import iFavoritedClassesRepository from '../../repositories/iFavoritedClassesRepository';

interface Request {
	user_id: string;
	class_id: string;
}

class FavoriteClassService {
	constructor(private favoritesRepository: iFavoritedClassesRepository) {}

	public async execute({ user_id, class_id }: Request): Promise<void> {
		const favoritedClassesByThisUser = await this.favoritesRepository.findAllByUserId(
			user_id,
		);

		const checkIfExist = favoritedClassesByThisUser.find(
			favoritedClass => favoritedClass.class_id === class_id,
		);

		if (checkIfExist) {
			return;
		}

		await this.favoritesRepository.save({
			user_id,
			class_id,
		});

		return;
	}
}

export default FavoriteClassService;
