import { sign, verify } from 'jsonwebtoken';
import authConfig from '../../shared/config/auth';
import iJWTProvider, {
	Payload,
	Token,
} from '../../domain/providers/iJWTProvider';
import AppError from '../../shared/errors/AppError';

class JWTProvider implements iJWTProvider {
	private secret = authConfig.jwt.secret;
	private expiresIn = authConfig.jwt.expiresIn;

	public generate({ user_id }: Payload): Token {
		try {
			const token = sign({ user_id }, this.secret, {
				expiresIn: this.expiresIn,
			});

			return { token };
		} catch {
			throw new AppError('Invalid payload');
		}
	}

	public getPayload({ token }: Token): Payload {
		try {
			const payload = verify(token, this.secret) as Payload;
			return payload;
		} catch {
			throw new AppError('Invalid token', 401);
		}
	}
}

export default JWTProvider;
