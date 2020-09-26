import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const showUserSchema = Joi.object({
	user_id: Joi.string().required(),
});

export default async function showUserValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { user_id } = request.params;

	await showUserSchema.validateAsync({
		user_id,
	});

	return next();
}
