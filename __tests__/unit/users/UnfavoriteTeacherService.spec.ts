import faker from 'faker';

import UnfavoriteClassService from '../../../src/domain/services/Classes/UnfavoriteClassService';
import FakeFavoritedClassesRepository from '../../../src/domain/repositories/fakes/FakeFavoritedClassesRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';

import User from '../../../src/domain/models/User';
import Class from '../../../src/domain/models/Class';

describe('UnfavoriteClass', () => {
	let fakeFavoritedClassesRepository: FakeFavoritedClassesRepository;
	let unfavoriteClass: UnfavoriteClassService;

	let fakeUsersRepository: FakeUsersRepository;
	let fakeClassesRepository: FakeClassesRepository;

	let user: User;
	let teacher: User;

	let createdClass: Class;

	beforeEach(async () => {
		fakeFavoritedClassesRepository = new FakeFavoritedClassesRepository();
		unfavoriteClass = new UnfavoriteClassService(
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

		createdClass = await fakeClassesRepository.create({
			user_id: teacher.id,
			subject: 'any',
			cost: 50,
		});

		await fakeFavoritedClassesRepository.save({
			user_id: user.id,
			class_id: createdClass.id,
		});
	});

	it('should be able to unfavorite a teacher', async () => {
		const deleteFunction = jest.spyOn(fakeFavoritedClassesRepository, 'delete');

		await unfavoriteClass.execute({
			user_id: user.id,
			class_id: createdClass.id,
		});

		const favoritedClasses = await fakeFavoritedClassesRepository.findAllByUserId(
			user.id,
		);

		expect(favoritedClasses).toHaveLength(0);
		expect(deleteFunction).toHaveBeenCalledWith({
			user_id: user.id,
			class_id: createdClass.id,
		});
	});
});
