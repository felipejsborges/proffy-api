import iFavoritedTeachersRepository from '../../repositories/iFavoritedTeachersRepository';

interface Request {
	user_id: string;
	teacher_id: string;
}

class UnfavoriteTeacherService {
	constructor(private favoritesRepository: iFavoritedTeachersRepository) {}

	public async execute({ user_id, teacher_id }: Request): Promise<void> {
		await this.favoritesRepository.delete({
			user_id,
			teacher_id,
		});
	}
}

export default UnfavoriteTeacherService;
