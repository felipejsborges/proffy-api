import iClassesSchedulesRepository, {
	createClassSchedulesDTO,
	scheduleItem,
} from '../../../domain/repositories/iClassesSchedulesRepository';
import ClassSchedule from '../../models/ClassSchedule';

class ClassesSchedulesRepository implements iClassesSchedulesRepository {
	private savedClassesSchedules: ClassSchedule[] = [];

	public async create({
		classSchedules,
	}: createClassSchedulesDTO): Promise<ClassSchedule[]> {
		const createdClassSchedules: ClassSchedule[] = [];

		classSchedules.forEach((scheduleItem: scheduleItem) => {
			const scheduleItemToPush = new ClassSchedule({
				class_id: scheduleItem.class_id,
				week_day: scheduleItem.week_day,
				from: scheduleItem.from,
				to: scheduleItem.to,
			});

			createdClassSchedules.push(scheduleItemToPush);
			this.savedClassesSchedules.push(scheduleItemToPush);
		});

		return createdClassSchedules;
	}
}

export default ClassesSchedulesRepository;
