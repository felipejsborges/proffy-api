import Class from '../models/Class';

export interface createClassDTO {
	user_id: string;
	subject: string;
	cost: number;
}

export interface listClassesDTO {
	week_day: string;
	subject: string;
	timeInMinutes: number;
}

export default interface iClassesRepository {
	create(data: createClassDTO): Promise<Class>;
	index(data: listClassesDTO): Promise<Class[]>;
}
