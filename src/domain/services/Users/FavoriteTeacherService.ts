import FavoritedTeacher from '../../models/FavoritedTeacher';
import iFavoritedTeachersRepository from '../../repositories/iFavoritedTeachersRepository';

interface Request {
	user_id: string;
	teacher_id: string;
}

class FavoriteTeacherService {
	constructor(private favoritesRepository: iFavoritedTeachersRepository) {}

	public async execute({
		user_id,
		teacher_id,
	}: Request): Promise<FavoritedTeacher> {
		return await this.favoritesRepository.favoriteUser({
			user_id,
			teacher_id,
		});
	}
}

export default FavoriteTeacherService;
