import iUsersRepository, {
	createUserDTO,
	findOneUserByEmailDTO,
	findOneUserByIdDTO,
	updateUserDTO,
} from '../../../domain/repositories/iUsersRepository';
import User from '../../../domain/models/User';
import AppError from '../../../shared/errors/AppError';

class UsersRepository implements iUsersRepository {
	private users: User[] = [];

	public async create({
		name,
		email,
		password,
		avatar,
		whatsapp,
		bio,
	}: createUserDTO): Promise<User> {
		const user = new User({ name, email, password, avatar, whatsapp, bio });

		this.users.push(user);

		return user;
	}

	public async findOneById({
		user_id,
	}: findOneUserByIdDTO): Promise<User | undefined> {
		const user = this.users.find(user => user.id === user_id);

		return user;
	}

	public async findOneByEmail({
		email,
	}: findOneUserByEmailDTO): Promise<User | undefined> {
		const user = this.users.find((user: User) => user.email === email);

		return user;
	}

	public async update({
		user_id,
		name,
		email,
		new_password,
		avatar,
		whatsapp,
		bio,
	}: updateUserDTO): Promise<User> {
		const index = this.users.findIndex(user => user.id === user_id);

		if (index < 0) {
			throw new AppError('User does not found', 401);
		}

		name && (this.users[index].name = name);
		email && (this.users[index].email = email);
		avatar && (this.users[index].avatar = avatar);
		whatsapp && (this.users[index].whatsapp = whatsapp);
		bio && (this.users[index].bio = bio);
		new_password && (this.users[index].password = new_password);

		const userUpdated = this.users[index];

		return userUpdated;
	}

	public async deleteAvatar(user_id: string): Promise<void> {
		const index = this.users.findIndex(user => user.id === user_id);

		if (index < 0) {
			throw new AppError('User does not found', 401);
		}

		this.users[index].avatar = null;

		return;
	}
}

export default UsersRepository;
