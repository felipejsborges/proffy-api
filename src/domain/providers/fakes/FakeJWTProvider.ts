import authConfig from '../../../shared/config/auth';
import AppError from '../../../shared/errors/AppError';
import iJWTProvider, { Payload, Token } from '../iJWTProvider';

class FakeJWTProvider implements iJWTProvider {
	private secret = authConfig.jwt.secret;
	private expiresIn = authConfig.jwt.expiresIn;

	public generate({ user_id }: Payload): Token {
		const token =
			'tokenHeadersSimulator: ' +
			this.expiresIn +
			'.' +
			'tokenPayloadSimulator: ' +
			user_id +
			'.' +
			'tokenSignatureSimulator: ' +
			this.secret;

		return { token };
	}

	public getPayload({ token }: Token): Payload {
		const [, tokenPayload, tokenSignature] = token.split('.');

		if (tokenSignature === 'tokenSignatureSimulator: ' + this.secret) {
			const [, user_id] = tokenPayload.split(': ') as [string, string];

			const payload = {
				user_id,
			};

			return payload;
		} else {
			throw new AppError('Invalid token', 401);
		}
	}
}

export default FakeJWTProvider;
