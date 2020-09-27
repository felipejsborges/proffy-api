import { Request, Response } from 'express';

import CreateClassService from '../../../domain/services/Classes/CreateClassService';
import ListClassesService from '../../../domain/services/Classes/ListClassesService';
import ShowClassService from '../../../domain/services/Classes/ShowClassService';

import ClassesRepository from '../../../infra/typeorm/repositories/ClassesRepository';

class ClassesController {
	public async index(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const listClasses = new ListClassesService(classesRepository);

		const { subject, week_day, time } = request.listClassesParams.filters;

		const { skip, limit, page } = request.listClassesParams.pagination;

		const paginatedClasses = await listClasses.execute({
			week_day,
			subject,
			time,
			skip,
			limit,
		});

		Object.assign(paginatedClasses, {
			page,
		});

		return response.status(200).json(paginatedClasses);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const createClass = new CreateClassService(classesRepository);

		const user_id = request.user.id;
		const { subject, cost } = request.body;

		const createdClass = await createClass.execute({
			user_id,
			subject,
			cost,
		});

		return response.status(201).send(createdClass);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const showClass = new ShowClassService(classesRepository);

		const { class_id } = request.params;

		const classItem = await showClass.execute({ class_id });

		return response.status(200).json(classItem);
	}
}

export default ClassesController;
