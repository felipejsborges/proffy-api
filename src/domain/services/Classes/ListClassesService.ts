import convertHourToMinutes from '../../../utils/convertHourToMinute';
import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	week_day: string | null;
	subject: string | null;
	time: string | null;
}

export default class CreateClassService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ week_day, subject, time }: Request): Promise<Class[]> {
		if (!week_day || !subject || !time) {
			throw new Error('Missing filters to search classes');
		}

		const timeInMinutes = convertHourToMinutes(time);

		const classes = this.classesRepository.index({
			week_day,
			subject,
			timeInMinutes,
		});

		return classes;
	}
}
