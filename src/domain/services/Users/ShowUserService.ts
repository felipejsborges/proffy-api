import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	user_id: string;
}

class ShowUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute({ user_id }: Request): Promise<User> {
		const user = await this.usersRepository.findOneById({ user_id });

		return user;
	}
}

export default ShowUserService;
