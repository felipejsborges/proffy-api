import User from '../models/User';

export interface createUserDTO {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

export interface findOneUserDTO {
	user_id: string;
}

export default interface iUsersRepository {
	create(data: createUserDTO): Promise<User>;
	findAll(): Promise<User[]>;
	findOneById(data: findOneUserDTO): Promise<User>;
}
