import faker from 'faker';

import UpdateAvatarService from '../../../src/domain/services/Users/UpdateAvatarService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../../src/domain/providers/fakes/FakeStorageProvider';

import AppError from '../../../src/shared/errors/AppError';
import User from '../../../src/domain/models/User';

describe('UpdateAvatar', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let updateAvatar: UpdateAvatarService;
	let fakeStorageProvider: FakeStorageProvider;

	let name: string;
	let email: string;
	let password: string;
	let fileName: string;

	let user: User;

	beforeEach(async () => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeStorageProvider = new FakeStorageProvider();
		updateAvatar = new UpdateAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();
		fileName = faker.image.avatar();

		user = await fakeUsersRepository.create({ name, email, password });
	});

	it('should be able to update avatar of an user', async () => {
		const userUpdated = await updateAvatar.execute({
			user_id: user.id,
			fileName,
		});

		expect(userUpdated.avatar).toBe(fileName);
	});

	it('should not be able to update avatar of a non-existing user', async () => {
		await expect(
			updateAvatar.execute({
				user_id: 'non-existingUserID',
				fileName,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to delete avatar when updating', async () => {
		await updateAvatar.execute({
			user_id: user.id,
			fileName,
		});

		const newAvatar = faker.image.avatar();

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const userUpdated = await updateAvatar.execute({
			user_id: user.id,
			fileName: newAvatar,
		});

		expect(deleteFile).toBeCalledWith(fileName);
		expect(userUpdated.avatar).toBe(newAvatar);
	});
});
