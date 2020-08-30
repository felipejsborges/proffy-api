import db from '../../database/connection';
import iUsersRepository, {
	createUserDTO,
} from '../../../api/repositories/interfaces/iUsersRepository';
import User from '../../../api/models/User';

export default class UsersRepository implements iUsersRepository {
	async index(): Promise<User[]> {
		const users = await db('users').select('*');

		return users;
	}

	async create({ name, avatar, whatsapp, bio }: createUserDTO): Promise<User> {
		const user = await db('users')
			.insert({
				name,
				avatar,
				whatsapp,
				bio,
			})
			.returning('*');

		return user[0];
	}

	async findById(user_id: number): Promise<User> {
		const user = await db('users').select('*').where({ id: user_id });

		return user[0];
	}
}
