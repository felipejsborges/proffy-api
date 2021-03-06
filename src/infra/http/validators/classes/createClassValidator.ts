import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createClassSchema = Joi.object({
	user_id: Joi.string().required(),
	subject: Joi.string().required(),
	cost: Joi.number().min(0).required().max(999),
});

export default async function createClassValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const user_id = request.user.id;
	const { subject, cost } = request.body;

	await createClassSchema.validateAsync({
		user_id,
		subject,
		cost,
	});

	return next();
}
