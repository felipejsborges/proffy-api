import iUsersRepository from '../../repositories/iUsersRepository';
import AppError from '../../../shared/errors/AppError';
import iStorageProvider from '../../providers/iStorageProvider';

interface Request {
	user_id: string;
}

class DeleteAvatarService {
	constructor(
		private usersRepository: iUsersRepository,
		private storageProvider: iStorageProvider,
	) {}

	public async execute({ user_id }: Request): Promise<void> {
		const user = await this.usersRepository.findOneById({ user_id });

		if (!user) {
			throw new AppError('User does not exist', 401);
		}

		if (!user.avatar) {
			return;
		}

		await this.storageProvider.deleteFile(user.avatar);

		await this.usersRepository.deleteAvatar(user_id);

		return;
	}
}

export default DeleteAvatarService;
