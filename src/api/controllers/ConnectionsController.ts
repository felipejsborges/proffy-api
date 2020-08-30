import { Request, Response } from 'express';
import TotalConnectionsService from '../services/Connections/TotalConnectionsService';
import CreateConnectionService from '../services/Connections/CreateConnectionService';

export default class ClassesController {
	async index(request: Request, response: Response): Promise<Response> {
		const totalConnections = new TotalConnectionsService();

		const total = await totalConnections.execute();

		return response.json(total);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createConnection = new CreateConnectionService();

		const { user_id } = request.body;

		await createConnection.execute(user_id);

		return response.status(201).send();
	}
}
