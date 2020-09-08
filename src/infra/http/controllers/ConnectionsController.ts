import { Request, Response } from 'express';

import ConnectionsRepository from '../../knex/repositories/ConnectionsRepository';

import TotalConnectionsService from '../../../domain/services/Connections/TotalConnectionsService';
import CreateConnectionService from '../../../domain/services/Connections/CreateConnectionService';

const connectionsRepository = new ConnectionsRepository();

export default class ClassesController {
	async index(request: Request, response: Response): Promise<Response> {
		const totalConnections = new TotalConnectionsService(connectionsRepository);

		const total = await totalConnections.execute();

		return response.status(200).json(total);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createConnection = new CreateConnectionService(connectionsRepository);

		const { user_id } = request.body;

		await createConnection.execute(user_id);

		return response.status(201).send();
	}
}
