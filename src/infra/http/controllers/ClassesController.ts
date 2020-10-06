import { Request, Response } from 'express';

import CreateClassService from '../../../domain/services/Classes/CreateClassService';
import ListClassesService from '../../../domain/services/Classes/ListClassesService';
import UpdateClassService from '../../../domain/services/Classes/UpdateClassService';
import DeleteClassService from '../../../domain/services/Classes/DeleteClassService';

import ClassesRepository from '../../../infra/typeorm/repositories/ClassesRepository';
import { classToClass } from 'class-transformer';

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

		return response.status(200).json(classToClass(paginatedClasses));
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

		return response.status(201).send(classToClass(createdClass));
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const updateClass = new UpdateClassService(classesRepository);

		const user_id = request.user.id;

		const { class_id } = request.params;

		const { subject, cost } = request.body;

		const updatedClass = await updateClass.execute({
			user_id,
			class_id,
			subject,
			cost,
		});

		return response.status(200).json(classToClass(updatedClass));
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const deleteClass = new DeleteClassService(classesRepository);

		const user_id = request.user.id;

		const { class_id } = request.params;

		await deleteClass.execute({
			user_id,
			class_id,
		});

		return response.status(204).send();
	}
}

export default ClassesController;
