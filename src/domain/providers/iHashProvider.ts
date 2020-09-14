export interface PasswordToHash {
	password: string;
}

export default interface iHashProvider {
	generateHash(data: PasswordToHash): Promise<string>;
	compareHash(
		noHashedPassword: string,
		hashedPassword: string,
	): Promise<boolean>;
}
