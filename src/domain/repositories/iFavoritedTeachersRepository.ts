import FavoritedTeacher from '../models/FavoritedTeacher';

export interface favoriteUserDTO {
	user_id: string;
	teacher_id: string;
}

export default interface iFavoritedTeachersRepository {
	favoriteUser(data: favoriteUserDTO): Promise<FavoritedTeacher>;
	unfavoriteUser(favorite_id: string): Promise<void>;
}
