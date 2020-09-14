import authConfig from '../../../config/auth';
import iJWTProvider, { Payload, Token } from '../iJWTProvider';

class JWTProvider implements iJWTProvider {
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
			const [, payload] = tokenPayload.split(': ') as [string, Payload];

			return payload;
		} else {
			throw new Error('Invalid token');
		}
	}
}

export default JWTProvider;
