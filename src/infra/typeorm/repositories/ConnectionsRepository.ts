import { getRepository, Repository } from 'typeorm';
import Connection from '../../../domain/models/Connection';
import iConnectionsRepository, {
	createConnectionDTO,
} from '../../../domain/repositories/iConnectionsRepository';
import ConnectionTypeORM from '../entities/ConnectionTypeORM';

class ConnectionsRepository implements iConnectionsRepository {
	private ormRepository: Repository<ConnectionTypeORM>;

	constructor() {
		this.ormRepository = getRepository(ConnectionTypeORM);
	}

	public async countTotal(): Promise<number> {
		const response = await this.ormRepository.findAndCount();

		return response[1];
	}

	public async create({ user_id }: createConnectionDTO): Promise<Connection> {
		const connection = new ConnectionTypeORM();
		connection.user_id = user_id;

		return await this.ormRepository.save(connection);
	}
}

export default ConnectionsRepository;
