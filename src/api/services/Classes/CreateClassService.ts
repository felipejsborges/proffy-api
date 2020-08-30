import ClassesRepository from '../../../infra/repositories/knex/ClassesRepository';
import Class from '../../models/Class';

interface Request {
	user_id: number;
	subject: string;
	cost: number;
	schedule: {
		week_day: number;
		from: string;
		to: string;
	}[];
}

const classesRepository = new ClassesRepository();

export default class CreateClassService {
	public async execute({
		user_id,
		subject,
		cost,
		schedule,
	}: Request): Promise<Class> {
		const createdClass = await classesRepository.create({
			user_id,
			subject,
			cost,
			schedule,
		});

		return createdClass;
	}
}
