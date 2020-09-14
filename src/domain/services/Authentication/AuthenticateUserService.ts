import User from '../../models/User';
import iHashProvider from '../../providers/iHashProvider';
import iJWTProvider from '../../providers/iJWTProvider';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	email: string;
	password: string;
}

interface Response {
	token: string;
	user: User;
}

class CreateUserService {
	constructor(
		private usersRepository: iUsersRepository,
		private jwtProvider: iJWTProvider,
		private hashProvider: iHashProvider,
	) {}

	public async execute({ email, password }: Request): Promise<Response> {
		const user = await this.usersRepository.findOneByEmail({ email });

		if (!user) {
			throw new Error(`Incorrect login information`);
		}

		const passwordMatch = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatch) {
			throw new Error(`Incorrect login information`);
		}

		const { token } = this.jwtProvider.generate({ user_id: user.id });

		return { user, token };
	}
}

export default CreateUserService;
