import faker from 'faker';

import CreateUserService from '../../../src/domain/services/Users/CreateUserService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import User from '../../../src/domain/models/User';

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
	});
});
