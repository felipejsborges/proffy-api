import { getRepository, Repository } from 'typeorm';

import ClassTypeORM from '../entities/ClassTypeORM';
import iClassesRepository, {
	findClassesDTO,
	createClassDTO,
	findOneClassDTO,
	findAllResults,
	updateClassDTO,
} from '../../../domain/repositories/iClassesRepository';
import Class from '../../../domain/models/Class';
import AppError from '../../../shared/errors/AppError';

class ClassesRepository implements iClassesRepository {
	private ormRepository: Repository<ClassTypeORM>;

	constructor() {
		this.ormRepository = getRepository(ClassTypeORM);
	}

	public async findAll({
		week_day,
		subject,
		time,
		skip = 0,
		limit = 999,
	}: findClassesDTO): Promise<findAllResults> {
		const [classes, total] = await this.ormRepository.findAndCount({
			join: {
				alias: 'classes',
				innerJoin: { classes_schedules: 'classes.classes_schedules' },
			},
			where: (qb: any) => {
				qb.where(subject ? { subject } : '1=1')
					.andWhere(
						week_day ? 'classes_schedules.week_day = :week_day' : '1=1',
						{ week_day },
					)
					.andWhere(time ? 'classes_schedules.from <= :from' : '1=1', {
						from: time,
					})
					.andWhere(time ? 'classes_schedules.to > :to' : '1=1', {
						to: time,
					});
			},
			skip,
			take: limit,
		});

		return {
			total,
			classes,
		};
	}

	public async findOneById({
		class_id,
	}: findOneClassDTO): Promise<Class | undefined> {
		const classItem = await this.ormRepository.findByIds([class_id]);

		return classItem[0];
	}

	public async findAllOfaTeacher(teacher_id: string): Promise<Class[]> {
		const classes = await this.ormRepository.find({
			where: { user_id: teacher_id },
		});

		return classes;
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

	public async update({
		class_id,
		subject,
		cost,
	}: updateClassDTO): Promise<Class> {
		const [classToUpdate] = await this.ormRepository.findByIds([class_id]);

		if (!classToUpdate) {
			throw new AppError('This class does not exist');
		}

		subject && (classToUpdate.subject = subject);

		cost && (classToUpdate.cost = cost);

		const updatedClass = await this.ormRepository.save(classToUpdate);

		return updatedClass;
	}

	public async delete(class_id: string): Promise<void> {
		const classToDelete = await this.ormRepository.findOne(class_id);

		if (!classToDelete) {
			throw new AppError('This class does not exist');
		}

		await this.ormRepository.remove(classToDelete);
	}
}

export default ClassesRepository;
