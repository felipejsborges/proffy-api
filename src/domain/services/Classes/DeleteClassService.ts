import AppError from '../../../shared/errors/AppError';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	user_id: string;
	class_id: string;
}

class DeleteClassService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ user_id, class_id }: Request): Promise<void> {
		const classItem = await this.classesRepository.findOneById({ class_id });

		if (!classItem) {
			throw new AppError('This class does not exist');
		}

		if (classItem.user_id !== user_id) {
			throw new AppError(
				'You do not have permission to updated this class',
				401,
			);
		}

		await this.classesRepository.delete(class_id);
	}
}

export default DeleteClassService;
