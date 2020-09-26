import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export default async function loginValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { email, password } = request.body;

	await loginSchema.validateAsync({
		email,
		password,
	});

	return next();
}
