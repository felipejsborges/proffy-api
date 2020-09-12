import ClassSchedule from '../models/ClassSchedule';

export interface scheduleItem {
	class_id: string;
	week_day: number;
	from: number;
	to: number;
}

export interface createClassSchedulesDTO {
	classSchedules: scheduleItem[];
}

export default interface iClassesSchedulesRepository {
	create(data: createClassSchedulesDTO): Promise<ClassSchedule[]>;
}
