import iUsersRepository, {
	createUserDTO,
	findOneUserByEmailDTO,
	findOneUserDTO,
} from '../../../domain/repositories/iUsersRepository';
import User from '../../../domain/models/User';

class UsersRepository implements iUsersRepository {
	private users: User[] = [];

	public async findAll(): Promise<User[]> {
		return this.users;
	}

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
	}: findOneUserDTO): Promise<User | undefined> {
		const user = this.users.find(user => user.id === user_id);

		return user;
	}

	public async findOneByEmail({
		email,
	}: findOneUserByEmailDTO): Promise<User | undefined> {
		const user = this.users.find((user: User) => user.email === email);

		return user;
	}
}

export default UsersRepository;
