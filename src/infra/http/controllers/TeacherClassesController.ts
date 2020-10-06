import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import ShowTeacherClassesService from '../../../domain/services/Classes/ShowTeacherClassesService';

import ClassesRepository from '../../../infra/typeorm/repositories/ClassesRepository';

class TeacherClassesController {
	public async index(request: Request, response: Response): Promise<Response> {
		const classesRepository = new ClassesRepository();
		const showTeacherClasses = new ShowTeacherClassesService(classesRepository);

		const teacher_id = request.user.id;

		const classes = await showTeacherClasses.execute({ teacher_id });

		return response.status(200).json(classToClass(classes));
	}
}

export default TeacherClassesController;
