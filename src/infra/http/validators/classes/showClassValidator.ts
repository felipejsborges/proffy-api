import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const showClassSchema = Joi.object({
	class_id: Joi.string().required(),
});

export default async function showClassValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const { class_id } = request.params;

	await showClassSchema.validateAsync({
		class_id,
	});

	return next();
}
