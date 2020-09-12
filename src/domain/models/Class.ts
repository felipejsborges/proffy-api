import { uuid } from 'uuidv4';

class Class {
	id: string;
	subject: string;
	cost: number;
	user_id: string;

	constructor({ subject, cost, user_id }: Omit<Class, 'id'>) {
		this.id = uuid();
		this.subject = subject;
		this.cost = cost;
		this.user_id = user_id;
	}
}

export default Class;
