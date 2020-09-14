import iHashProvider, { PasswordToHash } from '../iHashProvider';

class BCryptHashProvider implements iHashProvider {
	public async generateHash({ password }: PasswordToHash): Promise<string> {
		return password;
	}

	public async compareHash(
		noHashedPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		return noHashedPassword === hashedPassword;
	}
}

export default BCryptHashProvider;
