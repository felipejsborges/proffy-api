import faker from 'faker';

import ShowUserService from '../../../src/domain/services/Users/ShowUserService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import User from '../../../src/domain/models/User';
import AppError from '../../../src/shared/errors/AppError';

describe('ShowUser', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let showUser: ShowUserService;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showUser = new ShowUserService(fakeUsersRepository);
	});

	it('should be able to get info of a specific user', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const createdUser = await fakeUsersRepository.create({
			name,
			email,
			password,
		});

		const user = await showUser.execute({ user_id: createdUser.id });

		expect(user).toBeInstanceOf(User);
		expect(user.name).toBe(name);
		expect(user.email).toBe(email);
	});

	it('should not be able to get info of a non-existing user', async () => {
		await expect(
			showUser.execute({ user_id: 'non-existingUserID' }),
		).rejects.toBeInstanceOf(AppError);
	});
});
