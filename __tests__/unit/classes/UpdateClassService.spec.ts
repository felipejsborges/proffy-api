import faker from 'faker';

import UpdateClassService from '../../../src/domain/services/Classes/UpdateClassService';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';
import Class from '../../../src/domain/models/Class';
import AppError from '../../../src/shared/errors/AppError';

describe('UpdateClass', () => {
	let fakeClassesRepository: FakeClassesRepository;
	let updateClass: UpdateClassService;

	let user_id: string;
	let subject: string;
	let cost: number;

	let createdClass: Class;

	beforeEach(async () => {
		fakeClassesRepository = new FakeClassesRepository();
		updateClass = new UpdateClassService(fakeClassesRepository);

		user_id = faker.random.uuid();
		subject = faker.random.word();
		cost = faker.random.number({ min: 1, max: 999, precision: 0 });

		createdClass = await fakeClassesRepository.create({
			user_id,
			subject,
			cost,
		});
	});

	it('should be able to update a class', async () => {
		const updatedSubject = faker.random.word();
		const updatedCost = 50;

		const updatedClass = await updateClass.execute({
			user_id,
			class_id: createdClass.id,
			subject: updatedSubject,
			cost: updatedCost,
		});

		expect(updatedClass).toBeInstanceOf(Class);
		expect(updatedClass.subject).toBe(updatedSubject);
		expect(updatedClass.cost).toBe(updatedCost);
	});

	it('should not be able to update a non-existing class', async () => {
		await expect(
			updateClass.execute({
				user_id,
				class_id: 'non-existingClassId',
				subject,
				cost,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update a class if the user is not the owner', async () => {
		await expect(
			updateClass.execute({
				user_id: 'anotherUserId',
				class_id: createdClass.id,
				subject,
				cost,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
