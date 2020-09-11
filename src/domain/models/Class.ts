import { uuid } from 'uuidv4';

import ClassSchedule from './ClassSchedule';

export default class Class {
	id: string;
	subject: string;
	cost: number;
	user_id: string;
	class_schedule: ClassSchedule[];

	constructor({ subject, cost, user_id, class_schedule }: Omit<Class, 'id'>) {
		this.id = uuid();
		this.subject = subject;
		this.cost = cost;
		this.user_id = user_id;
		this.class_schedule = class_schedule;
	}
}
