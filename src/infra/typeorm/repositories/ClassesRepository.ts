import {
	getRepository,
	Repository,
	LessThanOrEqual,
	MoreThan,
	WhereExpression,
} from 'typeorm';

import ClassTypeORM from '../entities/ClassTypeORM';
import iClassesRepository, {
	findClassesDTO,
	createClassDTO,
	findOneClassDTO,
} from '../../../domain/repositories/iClassesRepository';
import Class from '../../../domain/models/Class';

class ClassesRepository implements iClassesRepository {
	private ormRepository: Repository<ClassTypeORM>;

	constructor() {
		this.ormRepository = getRepository(ClassTypeORM);
	}

	public async findAll({
		week_day,
		subject,
		timeInMinutes,
	}: findClassesDTO): Promise<Class[]> {
		return await this.ormRepository.find({
			join: {
				alias: 'classes',
				innerJoin: { classes_schedules: 'classes.classes_schedules' },
			},
			// relations: ['classes_schedules'],
			where: (qb: WhereExpression) => {
				qb.where({
					subject,
				}).andWhere('classes_schedules.week_day = :week_day', { week_day });
			},
			// where: {
			// 	subject,
			// 	classes_schedules: {
			// 		week_day,
			// 		from: LessThanOrEqual(timeInMinutes),
			// 		to: MoreThan(timeInMinutes),
			// 	},
			// },
		});
	}

	public async findOneById({ class_id }: findOneClassDTO): Promise<Class> {
		const classItem = await this.ormRepository.findByIds([class_id]);

		return classItem[0];
	}

	public async create({
		user_id,
		subject,
		cost,
	}: createClassDTO): Promise<Class> {
		const classItem = new ClassTypeORM();
		classItem.subject = subject;
		classItem.cost = cost;
		classItem.user_id = user_id;

		return await this.ormRepository.save(classItem);
	}
}

export default ClassesRepository;
