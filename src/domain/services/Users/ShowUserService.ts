import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

export default class ShowUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute(user_id: number): Promise<User> {
		const user = this.usersRepository.findById(user_id);

		return user;
	}
}
