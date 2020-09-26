import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createClassScheduleSchema = Joi.object({
	class_id: Joi.string().required(),
	classSchedules: Joi.array().items(
		Joi.object({
			week_day: Joi.number().min(0).max(6).required(),
			from: Joi.string().length(5).required(),
			to: Joi.string().length(5).required(),
		})
			.min(1)
			.required(),
	),
});

export default async function createClassScheduleValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { class_id } = request.params;
	const { classSchedules } = request.body;

	await createClassScheduleSchema.validateAsync({
		class_id,
		classSchedules,
	});

	return next();
}
