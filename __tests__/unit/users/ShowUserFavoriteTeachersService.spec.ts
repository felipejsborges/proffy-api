import faker from 'faker';

import ShowUserFavoriteTeachersService from '../../../src/domain/services/Users/ShowUserFavoriteTeachersService';
import FakeFavoritedTeachersRepository from '../../../src/domain/repositories/fakes/FakeFavoritedTeachersRepository';

import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';

import User from '../../../src/domain/models/User';

describe('FavoriteTeacher', () => {
	let fakeFavoritedTeachersRepository: FakeFavoritedTeachersRepository;
	let showUserFavoriteTeachers: ShowUserFavoriteTeachersService;

	let fakeUsersRepository: FakeUsersRepository;

	let user: User;
	let teacher: User;

	beforeEach(async () => {
		fakeFavoritedTeachersRepository = new FakeFavoritedTeachersRepository();
		showUserFavoriteTeachers = new ShowUserFavoriteTeachersService(
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

	it('should be able to list favorite teachers of a specific user', async () => {
		const favoriteTeachers = await showUserFavoriteTeachers.execute({
			user_id: user.id,
		});

		expect(favoriteTeachers).toHaveLength(1);
	});
});
