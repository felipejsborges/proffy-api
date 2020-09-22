import FavoritedTeacher from '../../models/FavoritedTeacher';
import iFavoritedTeachersRepository from '../../repositories/iFavoritedTeachersRepository';

interface Request {
	user_id: string;
}

class ShowUserFavoriteTeachers {
	constructor(
		private favoritedTeachersRepository: iFavoritedTeachersRepository,
	) {}

	public async execute({
		user_id,
	}: Request): Promise<FavoritedTeacher[] | undefined> {
		const favoritedTeachers = await this.favoritedTeachersRepository.findAllByUserId(
			user_id,
		);

		return favoritedTeachers;
	}
}

export default ShowUserFavoriteTeachers;
