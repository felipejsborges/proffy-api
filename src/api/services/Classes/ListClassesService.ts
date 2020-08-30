import ClassesRepository from '../../../infra/repositories/knex/ClassesRepository';
import convertHourToMinutes from '../../utils/convertHourToMinute';
import Class from '../../models/Class';

interface Request {
	week_day: string | null;
	subject: string | null;
	time: string | null;
}

export default class CreateClassService {
	public async execute({ week_day, subject, time }: Request): Promise<Class[]> {
		const classesRepository = new ClassesRepository();

		if (!week_day || !subject || !time) {
			throw new Error('Missing filters to search classes');
		}

		const timeInMinutes = convertHourToMinutes(time);

		const classes = classesRepository.index({
			week_day,
			subject,
			timeInMinutes,
		});

		return classes;
	}
}
