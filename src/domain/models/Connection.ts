import { uuid } from 'uuidv4';

class Connection {
	id: string;
	user_id: string;

	constructor({ user_id }: Omit<Connection, 'id'>) {
		this.id = uuid();
		this.user_id = user_id;
	}
}

export default Connection;
