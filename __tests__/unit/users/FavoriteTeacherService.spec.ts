import faker from 'faker';

import FavoriteTeacherService from '../../../src/domain/services/Users/FavoriteTeacherService';
import FakeFavoritedTeachersRepository from '../../../src/domain/repositories/fakes/FakeFavoritedTeachersRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';

import User from '../../../src/domain/models/User';

describe('FavoriteTeacher', () => {
	let fakeFavoritedTeachersRepository: FakeFavoritedTeachersRepository;
	let favoriteTeacher: FavoriteTeacherService;

	let fakeUsersRepository: FakeUsersRepository;

	let user: User;
	let teacher: User;

	beforeEach(async () => {
		fakeFavoritedTeachersRepository = new FakeFavoritedTeachersRepository();
		favoriteTeacher = new FavoriteTeacherService(
			fakeFavoritedTeachersRepository,
		);

		fakeUsersRepository = new FakeUsersRepository();

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
	});

	it('should be able to favorite a teacher', async () => {
		const favoriteTeacherDetails = await favoriteTeacher.execute({
			user_id: user.id,
			teacher_id: teacher.id,
		});

		expect(favoriteTeacherDetails).toHaveProperty('id');
		expect(favoriteTeacherDetails).toHaveProperty('id');
	});
});
