import { Request, Response } from 'express';

import UpdateAvatarService from '../../../domain/services/Users/UpdateAvatarService';

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository';

class AvatarsController {
	public async update(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const updateAvatar = new UpdateAvatarService(usersRepository);

		const user_id = request.user.id;
		const fileName = request.fileName;

		const avatarUrl = await updateAvatar.execute({ user_id, fileName });

		return response.status(200).send(avatarUrl);
	}
}

export default AvatarsController;
