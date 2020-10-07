import { getRepository, Repository } from 'typeorm';
import FavoritedClass from '../../../domain/models/FavoritedClass';
import iFavoritedClassesRepository, {
	favoriteClassDTO,
	unfavoriteClassDTO,
} from '../../../domain/repositories/iFavoritedClassesRepository';
import FavoritedClassTypeORM from '../entities/FavoritedClassTypeORM';

class FavoritedClassesRepository implements iFavoritedClassesRepository {
	private ormRepository: Repository<FavoritedClassTypeORM>;

	constructor() {
		this.ormRepository = getRepository(FavoritedClassTypeORM);
	}

	public async save({ user_id, class_id }: favoriteClassDTO): Promise<void> {
		const favoritedClass = new FavoritedClass({
			user_id,
			class_id,
		});

		await this.ormRepository.save(favoritedClass);

		return;
	}

	public async findAllByUserId(user_id: string): Promise<FavoritedClass[]> {
		const favoritedClasses = await this.ormRepository.find({
			where: { user_id },
		});

		return favoritedClasses;
	}

	public async delete({
		user_id,
		class_id,
	}: unfavoriteClassDTO): Promise<void> {
		const teachersToUnfavorite = await this.ormRepository.find({
			where: { user_id, class_id },
		});

		await this.ormRepository.delete(teachersToUnfavorite[0]);
	}
}

export default FavoritedClassesRepository;
