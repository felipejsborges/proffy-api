import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createConnectionSchema = Joi.object({
	user_id: Joi.string().required(),
	teacher_id: Joi.string().required(),
});

export default async function createConnectionValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const user_id = request.user.id;
	const { teacher_id } = request.body;

	await createConnectionSchema.validateAsync({
		user_id,
		teacher_id,
	});

	return next();
}
