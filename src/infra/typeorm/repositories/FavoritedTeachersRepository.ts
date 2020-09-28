import { getRepository, Repository } from 'typeorm';
import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteTeacherDTO,
	unfavoriteTeacherDTO,
} from '../../../domain/repositories/iFavoritedTeachersRepository';
import FavoritedTeacherTypeORM from '../entities/FavoritedTeacherTypeORM';

class FavoritedTeachersRepository implements iFavoritedTeachersRepository {
	private ormRepository: Repository<FavoritedTeacherTypeORM>;

	constructor() {
		this.ormRepository = getRepository(FavoritedTeacherTypeORM);
	}

	public async save({
		user_id,
		teacher_id,
	}: favoriteTeacherDTO): Promise<void> {
		const favoritedTeacher = new FavoritedTeacher({
			user_id,
			teacher_id,
		});

		await this.ormRepository.save(favoritedTeacher);

		return;
	}

	public async findAllByUserId(user_id: string): Promise<FavoritedTeacher[]> {
		const favoritedTeachers = await this.ormRepository.find({
			where: { user_id },
		});

		return favoritedTeachers;
	}

	public async delete({
		user_id,
		teacher_id,
	}: unfavoriteTeacherDTO): Promise<void> {
		const teachersToUnfavorite = await this.ormRepository.find({
			where: { user_id, teacher_id },
		});

		await this.ormRepository.delete(teachersToUnfavorite[0]);
	}
}

export default FavoritedTeachersRepository;
