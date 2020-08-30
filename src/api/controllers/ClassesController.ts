import { Request, Response } from 'express';

import CreateClassService from '../services/Classes/CreateClassService';
import ListClassesService from '../services/Classes/ListClassesService';

export default class ClassesController {
	async index(request: Request, response: Response): Promise<Response> {
		const listClasses = new ListClassesService();

		const filters = request.query;
		const week_day = filters.week_day as string;
		const subject = filters.subject as string;
		const time = filters.time as string;

		const classes = await listClasses.execute({ week_day, subject, time });

		return response.json(classes);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createClass = new CreateClassService();

		const { user_id, subject, cost, schedule } = request.body;

		const createdClass = await createClass.execute({
			user_id,
			subject,
			cost,
			schedule,
		});

		return response.status(201).send(createdClass);
	}
}
