import Class from '../../models/Class';

export interface createClassDTO {
	user_id: number;
	subject: string;
	cost: number;
	schedule: {
		week_day: number;
		from: string;
		to: string;
	}[];
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
