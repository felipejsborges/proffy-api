import iFavoritedTeachersRepository from '../../repositories/iFavoritedTeachersRepository';

interface Request {
	user_id: string;
	teacher_id: string;
}

class FavoriteTeacherService {
	constructor(private favoritesRepository: iFavoritedTeachersRepository) {}

	public async execute({ user_id, teacher_id }: Request): Promise<void> {
		await this.favoritesRepository.save({
			user_id,
			teacher_id,
		});

		return;
	}
}

export default FavoriteTeacherService;
