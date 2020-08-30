import UsersRepository from '../../../infra/repositories/knex/UsersRepository';
import User from '../../models/User';

export default class ListUsersService {
	public async execute(): Promise<User[]> {
		const usersRepository = new UsersRepository();

		const users = usersRepository.index();

		return users;
	}
}
