import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

class ListUsersService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute(): Promise<User[]> {
		const users = await this.usersRepository.findAll();

		return users;
	}
}

export default ListUsersService;
