import db from '../../database/connection';
import iConnectionsRepository, {
	createConnectionDTO,
} from '../../../api/repositories/interfaces/iConnectionsRepository';

export default class ConnectionsRepository implements iConnectionsRepository {
	async index(): Promise<number> {
		const totalConnections = await db('connections').count('* as total');

		const { total } = totalConnections[0];

		return Number(total);
	}

	async create({ user_id }: createConnectionDTO): Promise<void> {
		await db('connections').insert({
			user_id,
		});

		return;
	}
}
