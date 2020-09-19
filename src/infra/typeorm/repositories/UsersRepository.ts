import { getRepository, Repository } from 'typeorm';
import UserTypeORM from '../entities/UserTypeORM';
import iUsersRepository, {
	createUserDTO,
	findOneUserByEmailDTO,
	findOneUserByIdDTO,
	updateUserDTO,
} from '../../../domain/repositories/iUsersRepository';
import User from '../../../domain/models/User';
import AppError from '../../../shared/errors/AppError';

class UsersRepository implements iUsersRepository {
	private ormRepository: Repository<UserTypeORM>;

	constructor() {
		this.ormRepository = getRepository(UserTypeORM);
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

	public async findOneById({
		user_id,
	}: findOneUserByIdDTO): Promise<User | undefined> {
		const user = await this.ormRepository.findByIds([user_id]);

		return user[0];
	}

	public async findOneByEmail({
		email,
	}: findOneUserByEmailDTO): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({ where: { email } });

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
		const user = await this.ormRepository.findOne(user_id);

		if (!user) {
			throw new AppError('User does not found');
		}

		name && (user.name = name);
		email && (user.email = email);
		avatar && (user.avatar = avatar);
		whatsapp && (user.whatsapp = whatsapp);
		bio && (user.bio = bio);
		new_password && (user.password = new_password);

		const updatedUser = await this.ormRepository.save(user);

		return updatedUser;
	}
}

export default UsersRepository;
