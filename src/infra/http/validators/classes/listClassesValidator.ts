import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const listClassesSchema = Joi.object({
	week_day: Joi.number().min(0).max(6),
	subject: Joi.string(),
	time: Joi.string().length(5),
	page: Joi.number().min(1),
	limit: Joi.number().min(1),
});

export default async function listClassesValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { week_day, subject, time, page, limit } = request.query;

	await listClassesSchema.validateAsync({
		week_day,
		subject,
		time,
		page,
		limit,
	});

	return next();
}
