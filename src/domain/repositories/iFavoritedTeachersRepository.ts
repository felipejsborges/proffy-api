import FavoritedTeacher from '../models/FavoritedTeacher';

export interface favoriteTeacherDTO {
	user_id: string;
	teacher_id: string;
}

export type unfavoriteTeacherDTO = favoriteTeacherDTO;

export default interface iFavoritedTeachersRepository {
	save(data: favoriteTeacherDTO): Promise<FavoritedTeacher>;
	findAllByUserId(user_id: string): Promise<FavoritedTeacher[]>;
	delete(data: unfavoriteTeacherDTO): Promise<void>;
}
