import UsersRepository from '../../../infra/repositories/knex/UsersRepository';
import User from '../../models/User';

export default class ShowUserService {
	public async execute(user_id: number): Promise<User> {
		const usersRepository = new UsersRepository();

		const user = usersRepository.findById(user_id);

		return user;
	}
}
