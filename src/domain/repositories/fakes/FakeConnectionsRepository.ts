import Connection from '../../../domain/models/Connection';
import iConnectionsRepository, {
	createConnectionDTO,
} from '../../../domain/repositories/iConnectionsRepository';

class ConnectionsRepository implements iConnectionsRepository {
	private connections: Connection[] = [];

	public async countTotal(): Promise<number> {
		return this.connections.length;
	}

	public async create({ user_id }: createConnectionDTO): Promise<Connection> {
		const connection = new Connection({ user_id });

		this.connections.push(connection);

		return connection;
	}
}

export default ConnectionsRepository;
