import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	teacher_id: string;
}

class ShowTeacherClassesService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({ teacher_id }: Request): Promise<Class[]> {
		const classes = await this.classesRepository.findAllOfaTeacher(teacher_id);

		return classes;
	}
}

export default ShowTeacherClassesService;
