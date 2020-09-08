import iConnectionsRepository from '../../repositories/iConnectionsRepository';

export default class CreateConnectionService {
	constructor(private connectionsRepository: iConnectionsRepository) {}

	public async execute(user_id: number): Promise<void> {
		return await this.connectionsRepository.create({
			user_id,
		});
	}
}
