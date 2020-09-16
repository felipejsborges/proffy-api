import { hash } from 'bcryptjs';
import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	user_id: string;
	name: string;
	email: string;
	old_password?: string;
	new_password?: string;
	password_confirmation?: string;
	avatar?: string;
	whatsapp?: string;
	bio?: string;
}

class UpdateUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute({
		user_id,
		name,
		email,
		old_password,
		new_password,
		password_confirmation,
		avatar,
		whatsapp,
		bio,
	}: Request): Promise<User> {
		const updatedUser = await this.usersRepository.update({
			user_id,
			name,
			email,
			new_password: new_password && (await hash(new_password, 8)),
			avatar,
			whatsapp,
			bio,
		});

		return updatedUser;
	}
}

export default UpdateUserService;
