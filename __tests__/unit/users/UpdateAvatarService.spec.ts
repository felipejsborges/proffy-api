import faker from 'faker';

import UpdateAvatarService from '../../../src/domain/services/Users/UpdateAvatarService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';

describe('UpdateAvatar', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let updateAvatar: UpdateAvatarService;

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		updateAvatar = new UpdateAvatarService(fakeUsersRepository);
	});

	it('should be able to update avatar of an user', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		const user = await fakeUsersRepository.create({ name, email, password });

		const fileName = faker.image.avatar();

		const userUpdated = await updateAvatar.execute({
			user_id: user.id,
			fileName,
		});

		expect(userUpdated.avatar).toBe(fileName);
	});
});
