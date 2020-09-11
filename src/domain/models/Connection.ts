import { uuid } from 'uuidv4';

export default class Class {
	id: string;
	user_id: string;

	constructor({ user_id }: Omit<Class, 'id'>) {
		this.id = uuid();
		this.user_id = user_id;
	}
}
