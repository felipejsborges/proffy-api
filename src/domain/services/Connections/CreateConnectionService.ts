import Connection from '../../models/Connection';
import iConnectionsRepository from '../../repositories/iConnectionsRepository';

interface Request {
	user_id: string;
	teacher_id: string;
}

class CreateConnectionService {
	constructor(private connectionsRepository: iConnectionsRepository) {}

	public async execute({ user_id, teacher_id }: Request): Promise<Connection> {
		return await this.connectionsRepository.create({
			user_id,
			teacher_id,
		});
	}
}

export default CreateConnectionService;
