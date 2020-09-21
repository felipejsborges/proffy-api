import { getRepository, Repository } from 'typeorm';
import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import iFavoritedTeachersRepository, {
	favoriteUserDTO,
} from '../../../domain/repositories/iFavoritedTeachersRepository';

class FavoritedTeachersRepository implements iFavoritedTeachersRepository {
	private ormRepository: Repository<FavoritedTeacherTypeORM>;

	constructor() {
		this.ormRepository = getRepository(FavoritedTeacherTypeORM);
	}

	public async favoriteUser({
		user_id,
		teacher_id,
	}: favoriteUserDTO): Promise<FavoritedTeacher> {
		const favoritedTeacher = new FavoritedTeacher({
			user_id,
			teacher_id,
		});

		const savedFavoritedTeacher = await this.ormRepository.save(
			favoritedTeacher,
		);

		return savedFavoritedTeacher;
	}

	public async unfavoriteUser(favorite_id: string): Promise<void> {
		const favoritedTeacher = await this.ormRepository.findByIds([favorite_id]);

		await this.ormRepository.delete(favoritedTeacher);
	}
}

export default FavoritedTeachersRepository;
