import faker from 'faker';

import AuthenticateUserService from '../../../domain/services/Users/AuthenticateUserService';

import FakeUsersRepository from '../../../domain/repositories/fakes/FakeUsersRepository';

import FakeJWTProvider from '../../../domain/providers/fakes/FakeJWTProvider';
import FakeHashProvider from '../../../domain/providers/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let authenticateUser: AuthenticateUserService;
	let fakeJWTProvider: FakeJWTProvider;
	let fakeHashProvider: FakeHashProvider;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeJWTProvider = new FakeJWTProvider();
		fakeHashProvider = new FakeHashProvider();
		authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeJWTProvider,
			fakeHashProvider,
		);
	});

	it('should be able to authenticate an user', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const createdUser = await fakeUsersRepository.create({
			name,
			email,
			password,
		});

		const response = await authenticateUser.execute({ email, password });

		expect(response).toHaveProperty('token');
		expect(response.user).toBe(createdUser);
	});

	it('should not be able to authenticate with a non-existing user', async () => {
		const email = faker.internet.email();
		const password = faker.internet.password();

		await expect(
			authenticateUser.execute({ email, password }),
		).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to authenticate with a wrong password', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		await fakeUsersRepository.create({ name, email, password });

		await expect(
			authenticateUser.execute({ email, password: 'wrong-pass' }),
		).rejects.toBeInstanceOf(Error);
	});
});
