import iClassesRepository, {
	createClassDTO,
	findOneClassDTO,
} from '../../../domain/repositories/iClassesRepository';
import Class from '../../../domain/models/Class';

class ClassesRepository implements iClassesRepository {
	private classes: Class[] = [];

	public async findAll(): Promise<Class[]> {
		return this.classes;
	}

	public async findOneById({
		class_id,
	}: findOneClassDTO): Promise<Class | undefined> {
		return this.classes.find((classItem: Class) => classItem.id === class_id);
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
}

export default ClassesRepository;
