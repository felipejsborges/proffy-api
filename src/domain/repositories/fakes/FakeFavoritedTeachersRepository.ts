import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteTeacherDTO,
} from '../../../domain/repositories/iFavoritedTeachersRepository';

class FakeFavoritedTeachersRepository implements iFavoritedTeachersRepository {
	private favoritedTeachers: FavoritedTeacher[] = [];

	public async save({
		user_id,
		teacher_id,
	}: favoriteTeacherDTO): Promise<FavoritedTeacher> {
		const favorited = new FavoritedTeacher({
			user_id,
			teacher_id,
		});

		this.favoritedTeachers.push(favorited);

		return favorited;
	}

	public async findAllByUserId(user_id: string): Promise<FavoritedTeacher[]> {
		const thisUserFavoritedTeachers: FavoritedTeacher[] = [];

		this.favoritedTeachers.forEach(favoritedTeacher => {
			if (favoritedTeacher.user_id === user_id) {
				thisUserFavoritedTeachers.push(favoritedTeacher);
			}
		});

		return thisUserFavoritedTeachers;
	}

	public async delete(favorite_id: string): Promise<void> {
		const filteredFavoritedTeachers = this.favoritedTeachers.filter(
			favoriteItem => favoriteItem.id !== favorite_id,
		);

		this.favoritedTeachers = filteredFavoritedTeachers;
	}
}

export default FakeFavoritedTeachersRepository;
