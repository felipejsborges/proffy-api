import User from '../models/User';

export interface createUserDTO {
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

export default interface iUsersRepository {
	create(data: createUserDTO): Promise<User>;
	index(): Promise<User[]>;
	findById(user_id: number): Promise<User>;
}
