import { Request, Response } from 'express';

import ClassesRepository from '../../knex/repositories/ClassesRepository';

import CreateClassService from '../../../domain/services/Classes/CreateClassService';
import ListClassesService from '../../../domain/services/Classes/ListClassesService';

const classesRepository = new ClassesRepository();

export default class ClassesController {
	async index(request: Request, response: Response): Promise<Response> {
		const listClasses = new ListClassesService(classesRepository);

		const filters = request.query;
		const week_day = filters.week_day as string;
		const subject = filters.subject as string;
		const time = filters.time as string;

		const classes = await listClasses.execute({ week_day, subject, time });

		return response.status(200).json(classes);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const createClass = new CreateClassService(classesRepository);

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
