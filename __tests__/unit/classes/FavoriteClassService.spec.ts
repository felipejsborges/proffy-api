import faker from 'faker';

import FavoriteClassService from '../../../src/domain/services/Classes/FavoriteClassService';
import FakeFavoritedClassesRepository from '../../../src/domain/repositories/fakes/FakeFavoritedClassesRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';

import User from '../../../src/domain/models/User';
import Class from '../../../src/domain/models/Class';

describe('FavoriteTeacher', () => {
	let fakeFavoritedClassesRepository: FakeFavoritedClassesRepository;
	let favoriteClass: FavoriteClassService;

	let fakeUsersRepository: FakeUsersRepository;
	let fakeClassesRepository: FakeClassesRepository;

	let user: User;
	let teacher: User;

	let classItem: Class;

	beforeEach(async () => {
		fakeFavoritedClassesRepository = new FakeFavoritedClassesRepository();
		favoriteClass = new FavoriteClassService(fakeFavoritedClassesRepository);

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

		classItem = await fakeClassesRepository.create({
			cost: 50,
			subject: 'any-Subject',
			user_id: teacher.id,
		});
	});

	it('should be able to favorite a teacher', async () => {
		await favoriteClass.execute({
			user_id: user.id,
			class_id: classItem.id,
		});

		const checkIfTeacherIsFavorited = await fakeFavoritedClassesRepository.findAllByUserId(
			user.id,
		);

		expect(checkIfTeacherIsFavorited[0]).toBeTruthy();
	});
});
