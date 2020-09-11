import User from '../models/User';

export interface createUserDTO {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

export default interface iUsersRepository {
	create(data: createUserDTO): Promise<User>;
	index(): Promise<User[]>;
	findById(data: number): Promise<User>;
}
