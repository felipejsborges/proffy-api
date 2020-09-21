import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteUserDTO,
} from '../../../domain/repositories/iFavoritedTeachersRepository';

class FakeFavoritedTeachersRepository implements iFavoritedTeachersRepository {
	private favoritedTeachers: FavoritedTeacher[] = [];

	public async favoriteUser({
		user_id,
		teacher_id,
	}: favoriteUserDTO): Promise<FavoritedTeacher> {
		const favorited = new FavoritedTeacher({
			user_id,
			teacher_id,
		});

		this.favoritedTeachers.push(favorited);

		return favorited;
	}

	public async unfavoriteUser(favorite_id: string): Promise<void> {
		const filteredFavoritedTeachers = this.favoritedTeachers.filter(
			favoriteItem => favoriteItem.id !== favorite_id,
		);

		this.favoritedTeachers = filteredFavoritedTeachers;
	}
}

export default FakeFavoritedTeachersRepository;
