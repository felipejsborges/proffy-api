import faker from 'faker';

import CreateClassService from '../../../src/domain/services/Classes/CreateClassService';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';
import Class from '../../../src/domain/models/Class';

describe('CreateClass', () => {
	let fakeClassesRepository: FakeClassesRepository;
	let createClass: CreateClassService;

	beforeEach(() => {
		fakeClassesRepository = new FakeClassesRepository();
		createClass = new CreateClassService(fakeClassesRepository);
	});

	it('should be able to create a class', async () => {
		const subject = faker.random.word();
		const cost = faker.random.number({ min: 1, max: 999, precision: 0 });
		const user_id = faker.random.uuid();

		const classItem = await createClass.execute({ subject, cost, user_id });

		expect(classItem).toBeInstanceOf(Class);
	});
});
