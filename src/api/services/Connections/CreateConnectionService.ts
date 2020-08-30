import ConnectionsRepository from '../../../infra/repositories/knex/ConnectionsRepository';

const connectionsRepository = new ConnectionsRepository();

export default class CreateConnectionService {
	public async execute(user_id: number): Promise<void> {
		return await connectionsRepository.create({
			user_id,
		});
	}
}
