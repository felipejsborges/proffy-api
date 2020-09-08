import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

export default class ListUsersService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute(): Promise<User[]> {
		const users = this.usersRepository.index();

		return users;
	}
}
