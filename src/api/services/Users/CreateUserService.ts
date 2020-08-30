import UsersRepository from '../../../infra/repositories/knex/UsersRepository';
import User from '../../models/User';

interface Request {
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}

const usersRepository = new UsersRepository();

export default class CreateUserService {
	public async execute({
		name,
		avatar,
		whatsapp,
		bio,
	}: Request): Promise<User> {
		const user = await usersRepository.create({
			name,
			avatar,
			whatsapp,
			bio,
		});

		return user;
	}
}
