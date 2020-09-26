import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import AppError from '../../../shared/errors/AppError';

export default function handleErrors(
	err: Error,
	request: Request,
	response: Response,
	next: NextFunction,
): Response {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	if (err instanceof ValidationError) {
		return response.status(400).json({
			status: 'validation error',
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		message: 'Internal server error',
	});
}
