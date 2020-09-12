import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	user_id: string;
	subject: string;
	cost: number;
}

class CreateClassService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ user_id, subject, cost }: Request): Promise<Class> {
		const createdClass = await this.classesRepository.create({
			user_id,
			subject,
			cost,
		});

		return createdClass;
	}
}

export default CreateClassService;
