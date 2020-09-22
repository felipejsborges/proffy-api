import faker from 'faker';

import UnfavoriteTeacherService from '../../../src/domain/services/Users/UnfavoriteTeacherService';
import FakeFavoritedTeachersRepository from '../../../src/domain/repositories/fakes/FakeFavoritedTeachersRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';

import User from '../../../src/domain/models/User';

describe('UnfavoriteTeacher', () => {
	let fakeFavoritedTeachersRepository: FakeFavoritedTeachersRepository;
	let unfavoriteTeacher: UnfavoriteTeacherService;

	let fakeUsersRepository: FakeUsersRepository;

	let user: User;
	let teacher: User;

	beforeEach(async () => {
		fakeFavoritedTeachersRepository = new FakeFavoritedTeachersRepository();
		unfavoriteTeacher = new UnfavoriteTeacherService(
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

		await fakeFavoritedTeachersRepository.save({
			user_id: user.id,
			teacher_id: teacher.id,
		});
	});

	it('should be able to unfavorite a teacher', async () => {
		const deleteFunction = jest.spyOn(
			fakeFavoritedTeachersRepository,
			'delete',
		);

		await unfavoriteTeacher.execute({
			user_id: user.id,
			teacher_id: teacher.id,
		});

		const favoritedTeachers = await fakeFavoritedTeachersRepository.findAllByUserId(
			user.id,
		);

		expect(favoritedTeachers).toHaveLength(0);
		expect(deleteFunction).toHaveBeenCalledWith({
			user_id: user.id,
			teacher_id: teacher.id,
		});
	});
});
