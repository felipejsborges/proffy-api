import iFavoritedClassesRepository from '../../repositories/iFavoritedClassesRepository';

interface Request {
	user_id: string;
	class_id: string;
}

class UnfavoriteClassService {
	constructor(private favoritesRepository: iFavoritedClassesRepository) {}

	public async execute({ user_id, class_id }: Request): Promise<void> {
		await this.favoritesRepository.delete({
			user_id,
			class_id,
		});
	}
}

export default UnfavoriteClassService;
