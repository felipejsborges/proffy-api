import { Request, Response } from 'express';

import ClassesSchedulesRepository from '../../../infra/typeorm/repositories/ClassesSchedulesRepository';
import CreateClassSchedulesService from '../../../domain/services/ClassesSchedules/CreateClassSchedulesService';
import { classToClass } from 'class-transformer';

class ClassesSchedulesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const classesSchedulesRepository = new ClassesSchedulesRepository();
		const createClassSchedules = new CreateClassSchedulesService(
			classesSchedulesRepository,
		);

		const { class_id } = request.params;
		const { classSchedules } = request.body;

		const createdClassSchedules = await createClassSchedules.execute({
			class_id,
			classSchedules,
		});

		return response.status(201).send(classToClass(createdClassSchedules));
	}
}

export default ClassesSchedulesController;
