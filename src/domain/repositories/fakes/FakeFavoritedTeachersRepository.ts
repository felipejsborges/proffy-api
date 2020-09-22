import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteTeacherDTO,
	unfavoriteTeacherDTO,
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
		console.log('TEST');
		const thisUserFavoritedTeachers = this.favoritedTeachers.filter(
			favoritedTeacher => favoritedTeacher.user_id === user_id,
		);

		return thisUserFavoritedTeachers;
	}

	public async delete({
		user_id,
		teacher_id,
	}: unfavoriteTeacherDTO): Promise<void> {
		const remainFavoritedTeachers = this.favoritedTeachers.filter(
			favoritedTeacher =>
				favoritedTeacher.user_id !== user_id ||
				favoritedTeacher.teacher_id !== teacher_id,
		);

		this.favoritedTeachers = remainFavoritedTeachers;
	}
}

export default FakeFavoritedTeachersRepository;
