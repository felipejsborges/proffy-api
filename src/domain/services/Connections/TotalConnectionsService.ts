import iConnectionsRepository from '../../repositories/iConnectionsRepository';

class TotalConnectionsService {
	constructor(private connectionsRepository: iConnectionsRepository) {}

	public async execute(): Promise<number> {
		const totalConnections = await this.connectionsRepository.countTotal();

		return totalConnections;
	}
}

export default TotalConnectionsService;
