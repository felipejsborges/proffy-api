import { sign, verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import iJWTProvider, {
	Payload,
	Token,
} from '../../domain/providers/iJWTProvider';

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
			throw new Error('Invalid payload');
		}
	}

	public getPayload({ token }: Token): Payload {
		try {
			const payload = verify(token, this.secret) as Payload;
			return payload;
		} catch {
			throw new Error('Invalid token');
		}
	}
}

export default JWTProvider;
