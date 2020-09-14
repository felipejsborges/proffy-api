import faker from 'faker';

import CreateUserService from '../../domain/services/Users/CreateUserService';
import ShowUserService from '../../domain/services/Users/ShowUserService';

import FakeUsersRepository from '../../domain/repositories/fakes/FakeUsersRepository';

import User from '../../domain/models/User';

describe('User', () => {
	let fakeUsersRepository: FakeUsersRepository;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
	});

	it('should be able to create an user', async () => {
		const createUser = new CreateUserService(fakeUsersRepository);

		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const user = await createUser.execute({ name, email, password });

		expect(user).toBeInstanceOf(User);
		expect(user).toHaveProperty('id');
	});

	it('should be able to get info of a specific user', async () => {
		const showUser = new ShowUserService(fakeUsersRepository);

		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const createdUser = await createUser.execute({ name, email, password });

		const user = await showUser.execute({ user_id: createdUser.id });

		expect(user).toBeInstanceOf(User);
		expect(user.name).toBe(name);
		expect(user.email).toBe(email);
	});
});
