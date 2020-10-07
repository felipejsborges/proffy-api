import faker from 'faker';

import ShowUserFavoriteClassesService from '../../../src/domain/services/Users/ShowUserFavoriteClassesService';
import FakeFavoritedClassesRepository from '../../../src/domain/repositories/fakes/FakeFavoritedClassesRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';

import User from '../../../src/domain/models/User';

describe('ShowUserFavoritedClasses', () => {
	let fakeFavoritedClassesRepository: FakeFavoritedClassesRepository;
	let showUserFavoritedClasses: ShowUserFavoriteClassesService;

	let fakeUsersRepository: FakeUsersRepository;
	let fakeClassesRepository: FakeClassesRepository;

	let user: User;
	let teacher: User;

	beforeEach(async () => {
		fakeFavoritedClassesRepository = new FakeFavoritedClassesRepository();
		showUserFavoritedClasses = new ShowUserFavoriteClassesService(
			fakeFavoritedClassesRepository,
		);

		fakeUsersRepository = new FakeUsersRepository();
		fakeClassesRepository = new FakeClassesRepository();

		const name1 = faker.name.findName();
		const email1 = faker.internet.email();
		const password1 = faker.internet.password();

		user = await fakeUsersRepository.create({
			name: name1,
			email: email1,
			password: password1,
		});

		const name2 = faker.name.findName();
		const email2 = faker.internet.email();
		const password2 = faker.internet.password();

		teacher = await fakeUsersRepository.create({
			name: name2,
			email: email2,
			password: password2,
		});

		const createdClass = await fakeClassesRepository.create({
			user_id: teacher.id,
			subject: 'any',
			cost: 50,
		});

		await fakeFavoritedClassesRepository.save({
			user_id: user.id,
			class_id: createdClass.id,
		});
	});

	it('should be able to list favorite teachers of a specific user', async () => {
		const findAllByUserId = jest.spyOn(
			fakeFavoritedClassesRepository,
			'findAllByUserId',
		);

		const favoritedClasses = await showUserFavoritedClasses.execute({
			user_id: user.id,
		});

		expect(favoritedClasses).toHaveLength(1);
		expect(findAllByUserId).toHaveBeenCalledWith(user.id);
	});
});
