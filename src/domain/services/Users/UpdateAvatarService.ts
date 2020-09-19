import User from '../../models/User';
import iUsersRepository from '../../repositories/iUsersRepository';
import { tempFolder } from '../../../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
	user_id: string;
	fileName: string;
}

class UpdateUserService {
	constructor(private usersRepository: iUsersRepository) {}

	public async execute({ user_id, fileName }: Request): Promise<User> {
		const user = await this.usersRepository.findOneById({ user_id });

		if (!user) {
			throw new Error('User does not exist');
		}

		if (user.avatar) {
			const avatarPathToDelete = path.join(tempFolder, user.avatar);

			const avatarPathToDeleteExists = await fs.promises.stat(
				avatarPathToDelete,
			);

			if (avatarPathToDeleteExists) {
				await fs.promises.unlink(avatarPathToDelete);
			}
		}

		const updatedUser = await this.usersRepository.update({
			user_id,
			avatar: fileName,
		});

		return updatedUser;
	}
}

export default UpdateUserService;
