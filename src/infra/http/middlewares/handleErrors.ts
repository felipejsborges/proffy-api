import { Request, Response, NextFunction } from 'express';
import AppError from '../../../errors/AppError';

export default function handleErrors(
	err: Error,
	request: Request,
	response: Response,
	next: NextFunction,
): any {
	if (err instanceof AppError) {
		return response.status(err.status).json({
			message: 'Error: ' + err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		message: 'Internal server error',
	});
}
