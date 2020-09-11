import { getRepository, Repository } from 'typeorm';
import iConnectionsRepository from '../../../domain/repositories/iConnectionsRepository';
import ConnectionTypeORM from '../entities/ConnectionTypeORM';

export class ConnectionsRepository implements iConnectionsRepository {
	constructor(private ormRepository: Repository<ConnectionTypeORM>) {
		ormRepository = getRepository(ConnectionTypeORM);
	}

	async index(): Promise<number> {
		return this.ormRepository.findAndCount();
	}
}
// import iConnectionsRepository, {
// 	createConnectionDTO,
// } from '../../../domain/repositories/iConnectionsRepository';
// import { Repository } from 'typeorm';
// import UserTypeORM from '../entities/';

// export default class ConnectionsRepository implements iConnectionsRepository {
// 	constructor(private ormRepository: Repository<UserTypeORM>) {
// 		ormRepository = getRepository(UserTypeORM);
// 	}

// 	async index(): Promise<number> {
// 		const totalConnections = await db('connections').count('* as total');

// 		const { total } = totalConnections[0];

// 		return Number(total);
// 	}

// 	async create({ user_id }: createConnectionDTO): Promise<void> {
// 		await db('connections').insert({
// 			user_id,
// 		});

// 		return;
// 	}
// }
