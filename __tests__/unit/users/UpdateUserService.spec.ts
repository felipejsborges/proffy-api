import faker from 'faker';

import UpdateUserService from '../../../src/domain/services/Users/UpdateUserService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';

describe('UpdateUser', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let updateUser: UpdateUserService;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		updateUser = new UpdateUserService(fakeUsersRepository);
	});

	it('should be able to update an user', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const user = await fakeUsersRepository.create({
			name,
			email,
			password,
		});

		const bio = faker.lorem.paragraph();
		const whatsapp = faker.phone.phoneNumber();

		const updatedUser = await updateUser.execute({
			user_id: user.id,
			name: 'Fake Changed Name',
			email: 'fakeChangedEmail@test.com',
			old_password: password,
			new_password: 'new_password',
			password_confirmation: 'new_password',
			bio,
			whatsapp,
		});

		expect(updatedUser.name).toBe('Fake Changed Name');
		expect(updatedUser.email).toBe('fakeChangedEmail@test.com');
		expect(updatedUser.bio).toBe(bio);
		expect(updatedUser.whatsapp).toBe(whatsapp);
	});
});
