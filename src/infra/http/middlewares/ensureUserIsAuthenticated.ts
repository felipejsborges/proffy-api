import { Request, Response, NextFunction } from 'express';
import AppError from '../../../shared/errors/AppError';
import JWTProvider from '../../providers/JWTProvider';

export default function ensureUserIsAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('Missing token', 401);
	}

	// token format -> 'Bearer <token>'
	const [, token] = authHeader.split(' ');

	const jwtProvider = new JWTProvider();

	try {
		const payload = jwtProvider.getPayload({ token });

		request.user = {
			id: payload.user_id,
		};

		return next();
	} catch {
		throw new AppError('Invalid token', 401);
	}
}
