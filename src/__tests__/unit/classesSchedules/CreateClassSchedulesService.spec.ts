import faker from 'faker';

import CreateClassSchedulesService from '../../../domain/services/ClassesSchedules/CreateClassSchedulesService';
import FakeClassesSchedulesRepository from '../../../domain/repositories/fakes/FakeClassesSchedulesRepository';

describe('CreateClassSchedule', () => {
	let fakeClassesSchedulesRepository: FakeClassesSchedulesRepository;
	let createClassSchedules: CreateClassSchedulesService;

	beforeEach(() => {
		fakeClassesSchedulesRepository = new FakeClassesSchedulesRepository();
		createClassSchedules = new CreateClassSchedulesService(
			fakeClassesSchedulesRepository,
		);
	});

	it('should be able to create a class schedule', async () => {
		const class_id = faker.random.uuid();

		const classSchedules = [
			{
				week_day: faker.random.number({ min: 0, max: 2 }),
				from: '08:00',
				to: '16:00',
			},
			{
				week_day: faker.random.number({ min: 3, max: 6 }),
				from: '09:00',
				to: '17:00',
			},
		];

		const classItem = await createClassSchedules.execute({
			class_id,
			classSchedules,
		});

		expect(classItem).toHaveLength(2);
	});
});
