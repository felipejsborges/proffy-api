import FavoritedClass from '../models/FavoritedClass';

export interface favoriteClassDTO {
	user_id: string;
	class_id: string;
}

export type unfavoriteClassDTO = favoriteClassDTO;

export default interface iFavoritedClassesRepository {
	save(data: favoriteClassDTO): Promise<void>;
	findAllByUserId(user_id: string): Promise<FavoritedClass[]>;
	delete(data: unfavoriteClassDTO): Promise<void>;
}
