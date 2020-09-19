import ClassScheduleTypeORM from '../../../infra/typeorm/entities/ClassScheduleTypeORM';
import ClassSchedule from '../../models/ClassSchedule';
import iClassesSchedulesRepository from '../../repositories/iClassesSchedulesRepository';
import convertHourToMinute from '../../../shared/utils/convertHourToMinute';

interface scheduleItem {
	week_day: number;
	from: string;
	to: string;
}

interface Request {
	class_id: string;
	classSchedules: scheduleItem[];
}

interface parsedScheduleItem {
	class_id: string;
	week_day: number;
	from: number;
	to: number;
}

class CreateClassSchedulesService {
	constructor(
		private classesSchedulesRepository: iClassesSchedulesRepository,
	) {}

	public async execute({
		class_id,
		classSchedules,
	}: Request): Promise<ClassSchedule[]> {
		const parsedClassSchedules = [] as parsedScheduleItem[];

		classSchedules.map((scheduleItem: scheduleItem) => {
			const scheduleItemToArray = new ClassScheduleTypeORM();
			scheduleItemToArray.class_id = class_id;
			scheduleItemToArray.week_day = scheduleItem.week_day;
			scheduleItemToArray.from = convertHourToMinute(scheduleItem.from);
			scheduleItemToArray.to = convertHourToMinute(scheduleItem.to);

			parsedClassSchedules.push(scheduleItemToArray);
		});

		return await this.classesSchedulesRepository.create({
			classSchedules: parsedClassSchedules,
		});
	}
}

export default CreateClassSchedulesService;
