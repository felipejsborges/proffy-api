import { getRepository, Repository } from 'typeorm';
import iClassesSchedulesRepository, {
	createClassSchedulesDTO,
	scheduleItem,
} from '../../../domain/repositories/iClassesSchedulesRepository';
import ClassScheduleTypeORM from '../entities/ClassScheduleTypeORM';

class ClassesSchedulesRepository implements iClassesSchedulesRepository {
	private ormRepository: Repository<ClassScheduleTypeORM>;

	constructor() {
		this.ormRepository = getRepository(ClassScheduleTypeORM);
	}

	public async create({
		classSchedules,
	}: createClassSchedulesDTO): Promise<ClassScheduleTypeORM[]> {
		return await this.ormRepository.save(classSchedules);
	}
}

export default ClassesSchedulesRepository;
