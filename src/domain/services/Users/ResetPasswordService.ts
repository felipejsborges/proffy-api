import AppError from '../../../shared/errors/AppError';
import iHashProvider from '../../providers/iHashProvider';
import iJWTProvider from '../../providers/iJWTProvider';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	password: string;
	token: string;
}

class ResetPasswordService {
	constructor(
		private usersRepository: iUsersRepository,
		private jwtProvider: iJWTProvider,
		private hashProvider: iHashProvider,
	) {}

	public async execute({ token, password }: Request): Promise<void> {
		let user_id: string;

		try {
			const payload = this.jwtProvider.getPayload({ token });
			user_id = payload.user_id;
		} catch {
			throw new AppError('Wrong token', 401);
		}

		const new_password = await this.hashProvider.generateHash({ password });

		await this.usersRepository.update({ user_id, new_password });
	}
}

export default ResetPasswordService;
