import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const deleteClassSchema = Joi.object({
	user_id: Joi.string().required(),
	class_id: Joi.string().required(),
});

export default async function deleteClassValidator(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	const user_id = request.user.id;
	const { class_id } = request.params;

	await deleteClassSchema.validateAsync({
		user_id,
		class_id,
	});

	return next();
}
