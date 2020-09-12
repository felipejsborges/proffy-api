import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	class_id: string;
}

class ShowClassService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ class_id }: Request): Promise<Class> {
		const classItem = await this.classesRepository.findOneById({
			class_id,
		});

		return classItem;
	}
}

export default ShowClassService;
