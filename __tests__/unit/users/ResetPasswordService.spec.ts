import faker from 'faker';

import ResetPasswordService from '../../../src/domain/services/Users/ResetPasswordService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeJWTProvider from '../../../src/domain/providers/fakes/FakeJWTProvider';
import FakeHashProvider from '../../../src/domain/providers/fakes/FakeHashProvider';
import AppError from '../../../src/shared/errors/AppError';
import User from '../../../src/domain/models/User';

describe('ResetPassword', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let resetPassword: ResetPasswordService;
	let fakeJWTProvider: FakeJWTProvider;
	let fakeHashProvider: FakeHashProvider;

	let name: string;
	let email: string;
	let password: string;

	let user: User;

	let token: string;

	beforeEach(async () => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeJWTProvider = new FakeJWTProvider();
		fakeHashProvider = new FakeHashProvider();

		resetPassword = new ResetPasswordService(
			fakeUsersRepository,
			fakeJWTProvider,
			fakeHashProvider,
		);

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();

		user = await fakeUsersRepository.create({ name, email, password });

		const payload = fakeJWTProvider.generate({ user_id: user.id });

		token = payload.token;
	});

	it('should be able to reset password', async () => {
		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		await resetPassword.execute({
			token,
			password: 'new-password',
		});

		const updatedUser = await fakeUsersRepository.findOneById({
			user_id: user.id,
		});

		expect(generateHash).toHaveBeenCalledWith({ password: 'new-password' });
		expect(updatedUser?.password).toBe('new-password');
	});

	it('should not be able to reset the password with non-existing token', async () => {
		await expect(
			resetPassword.execute({
				token: 'non-existing-token',
				password,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with non-existing user', async () => {
		const tokenOfaNonExistentUser = fakeJWTProvider.generate({
			user_id: 'non-existing-user',
		});

		await expect(
			resetPassword.execute({
				token: tokenOfaNonExistentUser.token,
				password,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
