import faker from 'faker';

import DeleteAvatarService from '../../../src/domain/services/Users/DeleteAvatarService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../../src/domain/providers/fakes/FakeStorageProvider';

import AppError from '../../../src/shared/errors/AppError';
import User from '../../../src/domain/models/User';

describe('DeleteAvatar', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let deleteAvatar: DeleteAvatarService;
	let fakeStorageProvider: FakeStorageProvider;

	let name: string;
	let email: string;
	let password: string;

	let user: User;

	beforeEach(async () => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeStorageProvider = new FakeStorageProvider();
		deleteAvatar = new DeleteAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();

		user = await fakeUsersRepository.create({ name, email, password });
	});

	it('should be able to delete avatar of an user', async () => {
		const fakeAvatar = faker.image.imageUrl();
		await fakeUsersRepository.update({ user_id: user.id, avatar: fakeAvatar });

		await deleteAvatar.execute({
			user_id: user.id,
		});

		const userWithNoAvatar = await fakeUsersRepository.findOneById({
			user_id: user.id,
		});

		if (!userWithNoAvatar) {
			throw new Error('User does not exist');
		}

		expect(userWithNoAvatar.avatar).toBeFalsy();
	});

	it('should not be able to delete avatar of a non-existing user', async () => {
		await expect(
			deleteAvatar.execute({
				user_id: 'non-existingUserID',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
