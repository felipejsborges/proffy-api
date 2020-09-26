import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createUserSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	avatar: Joi.any().meta({ swaggerType: 'file' }),
	whatsapp: Joi.string().min(8).max(12),
	bio: Joi.string().min(3),
});

export default async function createUserValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { name, email, password, avatar, whatsapp, bio } = request.body;

	await createUserSchema.validateAsync({
		name,
		email,
		password,
		avatar,
		whatsapp,
		bio,
	});

	return next();
}
