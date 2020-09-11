import { getRepository, Repository } from 'typeorm';
import UserTypeORM from '../entities/UserTypeORM';
import iUsersRepository, {
	createUserDTO,
} from '../../../domain/repositories/iUsersRepository';
import User from '../../../domain/models/User';

export class UsersRepository implements iUsersRepository {
	constructor(private ormRepository: Repository<UserTypeORM>) {
		ormRepository = getRepository(UserTypeORM);
	}

	async index(): Promise<User[]> {
		return await this.ormRepository.find();
	}

	async create({
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

	async findById(user_id: number): Promise<User> {
		const user = await this.ormRepository.findByIds([user_id]);

		return user[0];
	}
}
