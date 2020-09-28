import faker from 'faker';

import ShowTeacherClassesService from '../../../src/domain/services/Classes/ShowTeacherClassesService';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';
import Class from '../../../src/domain/models/Class';

describe('ShowTeacherClasses', () => {
	let fakeClassesRepository: FakeClassesRepository;
	let showTeacherClasses: ShowTeacherClassesService;

	beforeEach(() => {
		fakeClassesRepository = new FakeClassesRepository();
		showTeacherClasses = new ShowTeacherClassesService(fakeClassesRepository);
	});

	it('should be able to show all classes of a teacher', async () => {
		const user_id = faker.random.uuid();
		const subject1 = faker.random.word();
		const cost1 = faker.random.number({ min: 1, max: 999, precision: 0 });
		const class1 = await fakeClassesRepository.create({
			user_id,
			subject: subject1,
			cost: cost1,
		});

		const subject2 = faker.random.word();
		const cost2 = faker.random.number({ min: 1, max: 999, precision: 0 });
		const class2 = await fakeClassesRepository.create({
			user_id,
			subject: subject2,
			cost: cost2,
		});

		const subject3 = faker.random.word();
		const cost3 = faker.random.number({ min: 1, max: 999, precision: 0 });
		fakeClassesRepository.create({
			user_id: 'anotherUserId',
			subject: subject3,
			cost: cost3,
		});

		const classes = await showTeacherClasses.execute({ teacher_id: user_id });

		expect(classes).toEqual([class1, class2]);
	});
});
