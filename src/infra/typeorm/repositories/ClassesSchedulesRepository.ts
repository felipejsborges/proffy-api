import { getRepository, Repository } from 'typeorm';
import ClassSchedule from '../../../domain/models/ClassSchedule';
import iClassesSchedulesRepository, {
	createClassSchedulesDTO,
} from '../../../domain/repositories/iClassesSchedulesRepository';
import ClassScheduleTypeORM from '../entities/ClassScheduleTypeORM';

class ClassesSchedulesRepository implements iClassesSchedulesRepository {
	private ormRepository: Repository<ClassScheduleTypeORM>;

	constructor() {
		this.ormRepository = getRepository(ClassScheduleTypeORM);
	}

	public async create({
		classSchedules,
	}: createClassSchedulesDTO): Promise<ClassSchedule[]> {
		return await this.ormRepository.save(classSchedules);
	}
}

export default ClassesSchedulesRepository;
