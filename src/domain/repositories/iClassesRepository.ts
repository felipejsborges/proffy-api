import Class from '../models/Class';

export interface createClassDTO {
	user_id: string;
	subject: string;
	cost: number;
}

export interface findClassesDTO {
	week_day?: number;
	subject?: string;
	time?: number;
	skip?: number;
	limit?: number;
}

export interface findOneClassDTO {
	class_id: string;
}

export interface findAllResults {
	total: number;
	classes: Class[];
}

export interface updateClassDTO {
	class_id: string;
	subject?: string;
	cost?: number;
}

export default interface iClassesRepository {
	create(data: createClassDTO): Promise<Class>;
	findAll(data: findClassesDTO): Promise<findAllResults>;
	findOneById(data: findOneClassDTO): Promise<Class | undefined>;
	findAllOfaTeacher(teacher_id: string): Promise<Class[]>;
	update(data: updateClassDTO): Promise<Class>;
	delete(class_id: string): Promise<void>;
}
