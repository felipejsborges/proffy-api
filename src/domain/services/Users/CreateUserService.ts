import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

export default class CreateUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute({
		name,
		avatar,
		whatsapp,
		bio,
	}: Request): Promise<User> {
		const user = await this.usersRepository.create({
			name,
			avatar,
			whatsapp,
			bio,
		});

		return user;
	}
}
