import { hash, compare } from 'bcryptjs';
import iHashProvider, {
	PasswordToHash,
} from '../../domain/providers/iHashProvider';

class BCryptHashProvider implements iHashProvider {
	public async generateHash({ password }: PasswordToHash): Promise<string> {
		return await hash(password, 8);
	}

	public async compareHash(
		noHashedPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await compare(noHashedPassword, hashedPassword);
	}
}

export default BCryptHashProvider;
