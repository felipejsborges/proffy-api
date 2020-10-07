import FavoritedClass from '../../../domain/models/FavoritedClass';
import iFavoritedClassesRepository, {
	favoriteClassDTO,
	unfavoriteClassDTO,
} from '../../../domain/repositories/iFavoritedClassesRepository';

class FakeFavoritedClassesRepository implements iFavoritedClassesRepository {
	private favoritedClasses: FavoritedClass[] = [];

	public async save({ user_id, class_id }: favoriteClassDTO): Promise<void> {
		const favorited = new FavoritedClass({
			user_id,
			class_id,
		});

		this.favoritedClasses.push(favorited);

		return;
	}

	public async findAllByUserId(user_id: string): Promise<FavoritedClass[]> {
		const thisUserFavoritedClasses = this.favoritedClasses.filter(
			favoritedClass => favoritedClass.user_id === user_id,
		);

		return thisUserFavoritedClasses;
	}

	public async delete({
		user_id,
		class_id,
	}: unfavoriteClassDTO): Promise<void> {
		const remainFavoritedClasses = this.favoritedClasses.filter(
			favoritedClass =>
				favoritedClass.user_id !== user_id ||
				favoritedClass.class_id !== class_id,
		);

		this.favoritedClasses = remainFavoritedClasses;
	}
}

export default FakeFavoritedClassesRepository;
