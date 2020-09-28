import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const showTeacherClassesSchema = Joi.object({
	teacher_id: Joi.string().required(),
});

export default async function showTeacherClassesValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const teacher_id = request.user.id;

	await showTeacherClassesSchema.validateAsync({
		teacher_id,
	});

	return next();
}
