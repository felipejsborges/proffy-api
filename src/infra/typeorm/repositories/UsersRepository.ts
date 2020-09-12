import { getRepository, Repository } from 'typeorm';
import UserTypeORM from '../entities/UserTypeORM';
import iUsersRepository, {
	createUserDTO,
	findOneUserDTO,
} from '../../../domain/repositories/iUsersRepository';
import User from '../../../domain/models/User';

class UsersRepository implements iUsersRepository {
	private ormRepository: Repository<UserTypeORM>;

	constructor() {
		this.ormRepository = getRepository(UserTypeORM);
	}

	public async findAll(): Promise<User[]> {
		return await this.ormRepository.find();
	}

	public async create({
		name,
		email,
		password,
		avatar,
		whatsapp,
		bio,
	}: createUserDTO): Promise<User> {
		const user = new UserTypeORM();
		user.name = name;
		user.email = email;
		user.password = password;
		user.avatar = avatar;
		user.whatsapp = whatsapp;
		user.bio = bio;

		return await this.ormRepository.save(user);
	}

	public async findOneById({ user_id }: findOneUserDTO): Promise<User> {
		const user = await this.ormRepository.findByIds([user_id]);

		return user[0];
	}
}

export default UsersRepository;
