import faker from 'faker';

import CreateUserService from '../../../src/domain/services/Users/CreateUserService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import User from '../../../src/domain/models/User';
import AppError from '../../../src/shared/errors/AppError';

describe('CreateUser', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let createUser: CreateUserService;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		createUser = new CreateUserService(fakeUsersRepository);
	});

	it('should be able to create an user', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const user = await createUser.execute({ name, email, password });

		expect(user).toBeInstanceOf(User);
		expect(user.name).toBe(name);
		expect(user.email).toBe(email);
	});

	it('should not be able to create an user with an e-mail that already exists', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		await fakeUsersRepository.create({ name, email, password });

		await expect(
			createUser.execute({
				name: 'Other Name',
				email,
				password: 'Other Password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
