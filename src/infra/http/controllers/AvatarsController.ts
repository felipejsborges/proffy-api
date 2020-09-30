import { Request, Response } from 'express';

import UpdateAvatarService from '../../../domain/services/Users/UpdateAvatarService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';
import DiskStorageProvider from '../../../infra/providers/DiskStorageProvider';
import DeleteAvatarService from '../../../domain/services/Users/DeleteAvatarService';

class AvatarsController {
	public async update(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const diskStorageProvider = new DiskStorageProvider();
		const updateAvatar = new UpdateAvatarService(
			usersRepository,
			diskStorageProvider,
		);

		const user_id = request.user.id;
		const fileName = request.fileName;

		const user = await updateAvatar.execute({ user_id, fileName });

		return response.status(200).json(user);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const diskStorageProvider = new DiskStorageProvider();
		const deleteAvatar = new DeleteAvatarService(
			usersRepository,
			diskStorageProvider,
		);

		const user_id = request.user.id;

		await deleteAvatar.execute({ user_id });

		return response.status(204).send();
	}
}

export default AvatarsController;
