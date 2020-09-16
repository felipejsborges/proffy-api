import iUsersRepository, {
	createUserDTO,
	findOneUserByEmailDTO,
	findOneUserByIdDTO,
	updateUserDTO,
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

		let updatedUser = {
			...this.users[index],
			name,
			email,
			avatar,
			whatsapp,
			bio,
		};

		if (new_password) {
			updatedUser = {
				...updatedUser,
				password: new_password,
			};
		}

		this.users[index] = updatedUser;

		return updatedUser;
	}
}

export default UsersRepository;
