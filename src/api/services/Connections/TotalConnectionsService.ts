import ConnectionsRepository from '../../../infra/repositories/knex/ConnectionsRepository';

export default class CreateClassService {
	public async execute(): Promise<number> {
		const connectionsRepository = new ConnectionsRepository();

		const totalConnections = connectionsRepository.index();

		return totalConnections;
	}
}
