import { Request, Response } from 'express';

import TotalConnectionsService from '../../../domain/services/Connections/TotalConnectionsService';
import CreateConnectionService from '../../../domain/services/Connections/CreateConnectionService';

import ConnectionsRepository from '../../../infra/typeorm/repositories/ConnectionsRepository';

class ConnectionsController {
	public async index(request: Request, response: Response): Promise<Response> {
		const connectionsRepository = new ConnectionsRepository();
		const totalConnections = new TotalConnectionsService(connectionsRepository);

		const total = await totalConnections.execute();

		return response.status(200).json(total);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const connectionsRepository = new ConnectionsRepository();
		const createConnection = new CreateConnectionService(connectionsRepository);

		const user_id = request.user.id;
		const { teacher_id } = request.body;

		await createConnection.execute({ user_id, teacher_id });

		return response.status(201).send();
	}
}

export default ConnectionsController;
