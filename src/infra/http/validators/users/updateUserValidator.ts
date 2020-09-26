import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const updateUserSchema = Joi.object({
	name: Joi.string().min(3),
	email: Joi.string().email(),
	password: Joi.string().min(6),
	whatsapp: Joi.string().min(8).max(12),
	bio: Joi.string().min(3),
});

export default async function updateUserValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { name, email, password, whatsapp, bio } = request.body;

	await updateUserSchema.validateAsync({
		name,
		email,
		password,
		whatsapp,
		bio,
	});

	return next();
}
