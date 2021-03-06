import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

class CreateUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute({
		name,
		email,
		password,
		avatar,
		whatsapp,
		bio,
	}: Request): Promise<User> {
		const userExist = await this.usersRepository.findOneByEmail({ email });

		if (userExist) {
			throw new AppError('This e-mail is already registered');
		}

		return await this.usersRepository.create({
			name,
			email,
			password: await hash(password, 8),
			avatar,
			whatsapp,
			bio,
		});
	}
}

export default CreateUserService;
