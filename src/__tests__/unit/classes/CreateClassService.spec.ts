import faker from 'faker';

import CreateClassService from '../../../domain/services/Classes/CreateClassService';
import FakeClassesRepository from '../../../domain/repositories/fakes/FakeClassesRepository';
import Class from '../../../domain/models/Class';

describe('CreateClass', () => {
	let fakeClassesRepository: FakeClassesRepository;
	let createClass: CreateClassService;

	beforeEach(() => {
		fakeClassesRepository = new FakeClassesRepository();
		createClass = new CreateClassService(fakeClassesRepository);
	});

	it('should be able to create a class', async () => {
		const subject = faker.random.word();
		const cost = faker.random.number({ min: 1, max: 99999, precision: 0 });
		const user_id = faker.random.uuid();

		const classItem = await createClass.execute({ subject, cost, user_id });

		expect(classItem).toBeInstanceOf(Class);
	});
});
