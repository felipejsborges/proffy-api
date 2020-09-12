import Class from '../models/Class';

export interface createClassDTO {
	user_id: string;
	subject: string;
	cost: number;
}

export interface findClassesDTO {
	week_day: number;
	subject: string;
	timeInMinutes: number;
}

export interface findOneClassDTO {
	class_id: string;
}

export default interface iClassesRepository {
	create(data: createClassDTO): Promise<Class>;
	findAll(data: findClassesDTO): Promise<Class[]>;
	findOneById(data: findOneClassDTO): Promise<Class>;
}
