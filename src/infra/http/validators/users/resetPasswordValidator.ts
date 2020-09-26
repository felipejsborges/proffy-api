import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const resetPasswordSchema = Joi.object({
	password: Joi.string().min(6).required(),
	token: Joi.string().required(),
});

export default async function resetPasswordValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { password } = request.body;

	const { token } = request.query;

	await resetPasswordSchema.validateAsync({
		password,
		token,
	});

	return next();
}
