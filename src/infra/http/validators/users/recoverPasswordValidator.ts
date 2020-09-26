import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const recoverPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export default async function recoverPasswordValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { email } = request.body;

	await recoverPasswordSchema.validateAsync({
		email,
	});

	return next();
}
