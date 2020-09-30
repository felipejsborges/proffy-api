import { uuid } from 'uuidv4';

class User {
	id: string;
	name: string;
	email: string;
	password: string;
	avatar?: string | null;
	whatsapp?: string;
	bio?: string;

	constructor({
		name,
		email,
		password,
		avatar,
		whatsapp,
		bio,
	}: Omit<User, 'id'>) {
		this.id = uuid();
		this.name = name;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.whatsapp = whatsapp;
		this.bio = bio;
	}
}

export default User;
