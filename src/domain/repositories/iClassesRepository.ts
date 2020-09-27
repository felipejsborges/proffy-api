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

export default interface iClassesRepository {
	create(data: createClassDTO): Promise<Class>;
	findAll(data: findClassesDTO): Promise<findAllResults>;
	findOneById(data: findOneClassDTO): Promise<Class | undefined>;
}
