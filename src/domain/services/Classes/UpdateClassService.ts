import AppError from '../../../shared/errors/AppError';
import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	user_id: string;
	class_id: string;
	subject?: string;
	cost?: number;
}

class UpdateClassService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({
		user_id,
		class_id,
		subject,
		cost,
	}: Request): Promise<Class> {
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

		const params = { class_id };

		subject && Object.assign(params, { subject });

		cost && Object.assign(params, { cost });

		const updatedClass = await this.classesRepository.update(params);

		return updatedClass;
	}
}

export default UpdateClassService;
