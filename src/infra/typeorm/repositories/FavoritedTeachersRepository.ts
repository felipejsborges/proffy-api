import { getRepository, Repository } from 'typeorm';
import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteTeacherDTO,
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
	}: favoriteTeacherDTO): Promise<FavoritedTeacher> {
		const favoritedTeacher = new FavoritedTeacher({
			user_id,
			teacher_id,
		});

		const savedFavoritedTeacher = await this.ormRepository.save(
			favoritedTeacher,
		);

		return savedFavoritedTeacher;
	}

	public async findAllByUserId(user_id: string): Promise<FavoritedTeacher[]> {
		const favoritedTeachers = await this.ormRepository.find({
			where: { user_id },
		});

		return favoritedTeachers;
	}

	public async delete(favorite_id: string): Promise<void> {
		const favoritedTeacher = await this.ormRepository.findByIds([favorite_id]);

		await this.ormRepository.delete(favoritedTeacher[0]);
	}
}

export default FavoritedTeachersRepository;
