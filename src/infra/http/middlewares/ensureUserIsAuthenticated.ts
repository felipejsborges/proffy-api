import { Request, Response, NextFunction } from 'express';
import JWTProvider from '../../providers/JWTProvider';

export default function ensureUserIsAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error('Missing token');
	}

	// token format -> 'Bearer <token>'
	const [, token] = authHeader.split(' ');

	try {
		const jwtProvider = new JWTProvider();

		const payload = jwtProvider.getPayload({ token });

		// request.user.id = payload.user_id;
		request.user = {
			id: payload.user_id,
		};

		return next();
	} catch {
		throw new Error('Invalid token');
	}
}