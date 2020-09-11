import { getRepository, Repository, LessThanOrEqual, MoreThan } from 'typeorm';

import ClassTypeORM from '../entities/ClassTypeORM';
import iClassesRepository, {
	listClassesDTO,
	createClassDTO,
} from '../../../domain/repositories/iClassesRepository';
import Class from '../../../domain/models/Class';

import convertHourToMinutes from '../../../utils/convertHourToMinute';

interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}

export class ClassesRepository implements iClassesRepository {
	constructor(private ormRepository: Repository<ClassTypeORM>) {
		ormRepository = getRepository(ClassTypeORM);
	}

	async index({
		week_day,
		subject,
		timeInMinutes,
	}: listClassesDTO): Promise<Class[]> {
		// USE ON CLASSES SCHEDULES REPO
		// await this.ormRepository.find({
		// 	where: {
		// 		week_day,
		// 		subject,
		// 		from: LessThanOrEqual(convertHourToMinutes(timeInMinutes)),
		// 		to: MoreThan(convertHourToMinutes(timeInMinutes)),
		// 	},
		// 	relations: ['users', 'classes_schedules'],
		// });
		// USE HERE
		// const classes = await db('classes')
		// 	.select(['classes.*', 'users.*', 'class_schedule.*'])
		// 	.join('users', 'classes.user_id', '=', 'users.id')
		// 	.join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
		// 	.where('classes.subject', '=', subject)
		// 	.andWhere('class_schedule.week_day', '=', Number(week_day))
		// 	.andWhere('class_schedule.from ', '<=', timeInMinutes)
		// 	.andWhere('class_schedule.to', '>', timeInMinutes);
	}

	async create({
		user_id,
		subject,
		cost,
		schedule,
	}: createClassDTO): Promise<Class> {
		// const trx = await db.transaction();
		// const insertedClass = await trx('classes')
		// 	.insert({
		// 		subject,
		// 		cost,
		// 		user_id,
		// 	})
		// 	.returning('*');
		// const class_id = insertedClass[0].id;
		// const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
		// 	return {
		// 		class_id,
		// 		week_day: scheduleItem.week_day,
		// 		from: convertHourToMinutes(scheduleItem.from),
		// 		to: convertHourToMinutes(scheduleItem.to),
		// 	};
		// });
		// const insertedClassSchedule = await trx('class_schedule')
		// 	.insert(classSchedule)
		// 	.returning('*');
		// await trx.commit();
		// return {
		// 	...insertedClass[0],
		// 	schedule: insertedClassSchedule,
		// };
	}
}
