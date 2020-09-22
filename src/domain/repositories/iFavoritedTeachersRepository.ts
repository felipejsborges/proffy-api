import FavoritedTeacher from '../models/FavoritedTeacher';

export interface favoriteTeacherDTO {
	user_id: string;
	teacher_id: string;
}

export default interface iFavoritedTeachersRepository {
	save(data: favoriteTeacherDTO): Promise<FavoritedTeacher>;
	findAllByUserId(user_id: string): Promise<FavoritedTeacher[]>;
	delete(favorite_id: string): Promise<void>;
}
