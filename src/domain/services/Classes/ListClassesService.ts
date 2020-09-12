import convertHourToMinutes from '../../../utils/convertHourToMinute';
import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	week_day: number;
	subject: string;
	time: string;
}

class ListClassesService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ week_day, subject, time }: Request): Promise<Class[]> {
		if (!week_day || !subject || !time) {
			throw new Error('Missing filters to search classes');
		}

		const timeInMinutes = convertHourToMinutes(time);

		const classes = await this.classesRepository.findAll({
			week_day,
			subject,
			timeInMinutes,
		});

		return classes;
	}
}

export default ListClassesService;
