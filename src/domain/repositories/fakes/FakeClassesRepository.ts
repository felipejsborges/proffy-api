import iClassesRepository, {
	createClassDTO,
	findAllResults,
	findOneClassDTO,
	updateClassDTO,
} from '../../../domain/repositories/iClassesRepository';
import Class from '../../../domain/models/Class';
import AppError from '../../../shared/errors/AppError';

class ClassesRepository implements iClassesRepository {
	private classes: Class[] = [];

	public async findAll(): Promise<findAllResults> {
		const classes = this.classes;
		const total = classes.length;

		return { classes, total };
	}

	public async findOneById({
		class_id,
	}: findOneClassDTO): Promise<Class | undefined> {
		return this.classes.find((classItem: Class) => classItem.id === class_id);
	}

	public async findAllOfaTeacher(teacher_id: string): Promise<Class[]> {
		const classes: Class[] = [];

		this.classes.forEach(classItem => {
			if (classItem.user_id === teacher_id) {
				classes.push(classItem);
			}
		});

		return classes;
	}

	public async create({
		user_id,
		subject,
		cost,
	}: createClassDTO): Promise<Class> {
		const classItem = new Class({ subject, cost, user_id });

		this.classes.push(classItem);

		return classItem;
	}

	public async update({
		class_id,
		subject,
		cost,
	}: updateClassDTO): Promise<Class> {
		const classToUpdateIndex = this.classes.findIndex(
			classItem => classItem.id === class_id,
		);

		if (classToUpdateIndex < 0) {
			throw new AppError('This class does not exist');
		}

		const classToUpdate = this.classes[classToUpdateIndex];

		subject && (classToUpdate.subject = subject);

		cost && (classToUpdate.cost = cost);

		this.classes[classToUpdateIndex] = classToUpdate;

		const updatedClass = this.classes[classToUpdateIndex];

		return updatedClass;
	}

	public async delete(class_id: string): Promise<void> {
		const classToDeleteIndex = this.classes.findIndex(
			classItem => classItem.id === class_id,
		);

		this.classes.splice(classToDeleteIndex, 1);
	}
}

export default ClassesRepository;
