import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const updateClassSchema = Joi.object({
	user_id: Joi.string().required(),
	class_id: Joi.string().required(),
	subject: Joi.string(),
	cost: Joi.number().min(0).max(999),
});

export default async function updateClassValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const user_id = request.user.id;
	const { class_id } = request.params;
	const { subject, cost } = request.body;

	await updateClassSchema.validateAsync({
		user_id,
		class_id,
		subject,
		cost,
	});

	return next();
}
