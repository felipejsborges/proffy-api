import iConnectionsRepository from '../../repositories/iConnectionsRepository';

export default class CreateClassService {
	constructor(private connectionsRepository: iConnectionsRepository) {}

	public async execute(): Promise<number> {
		const totalConnections = this.connectionsRepository.index();

		return totalConnections;
	}
}
