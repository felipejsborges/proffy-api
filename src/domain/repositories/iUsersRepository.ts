import User from '../models/User';

export interface createUserDTO {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

export interface updateUserDTO {
	user_id: string;
	name?: string;
	email?: string;
	new_password?: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

export interface findOneUserByIdDTO {
	user_id: string;
}

export interface findOneUserByEmailDTO {
	email: string;
}

export default interface iUsersRepository {
	create(data: createUserDTO): Promise<User>;
	findAll(): Promise<User[]>;
	findOneById(data: findOneUserByIdDTO): Promise<User | undefined>;
	findOneByEmail(data: findOneUserByEmailDTO): Promise<User | undefined>;
	update(data: updateUserDTO): Promise<User>;
}
