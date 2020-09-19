import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';
import AppError from '../../../shared/errors/AppError';
import iStorageProvider from '../../providers/iStorageProvider';

interface Request {
	user_id: string;
	fileName: string;
}

class UpdateAvatarService {
	constructor(
		private usersRepository: iUsersRepository,
		private storageProvider: iStorageProvider,
	) {}

	public async execute({ user_id, fileName }: Request): Promise<User> {
		const user = await this.usersRepository.findOneById({ user_id });

		if (!user) {
			throw new AppError('User does not exist', 401);
		}

		if (user.avatar) {
			this.storageProvider.deleteFile(user.avatar);
		}

		const savedFileName = await this.storageProvider.saveFile(fileName);

		user.avatar = savedFileName;

		const updatedUser = await this.usersRepository.update({
			user_id,
			avatar: savedFileName,
		});

		return updatedUser;
	}
}

export default UpdateAvatarService;
