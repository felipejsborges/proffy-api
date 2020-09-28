import faker from 'faker';

import DeleteClassService from '../../../src/domain/services/Classes/DeleteClassService';
import FakeClassesRepository from '../../../src/domain/repositories/fakes/FakeClassesRepository';
import Class from '../../../src/domain/models/Class';
import AppError from '../../../src/shared/errors/AppError';

describe('DeleteCLass', () => {
	let fakeClassesRepository: FakeClassesRepository;
	let deleteClass: DeleteClassService;

	let user_id: string;
	let subject: string;
	let cost: number;

	let createdClass: Class;

	beforeEach(async () => {
		fakeClassesRepository = new FakeClassesRepository();
		deleteClass = new DeleteClassService(fakeClassesRepository);

		user_id = faker.random.uuid();
		subject = faker.random.word();
		cost = faker.random.number({ min: 1, max: 999, precision: 0 });

		createdClass = await fakeClassesRepository.create({
			user_id,
			subject,
			cost,
		});
	});

	it('should be able to delete a class', async () => {
		await deleteClass.execute({
			user_id,
			class_id: createdClass.id,
		});

		const checkClassExist = await fakeClassesRepository.findOneById({
			class_id: createdClass.id,
		});

		expect(checkClassExist).toBeFalsy();
	});

	it('should not be able to update a non-existing class', async () => {
		await expect(
			deleteClass.execute({
				user_id,
				class_id: 'non-existingClassId',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update a class if the user is not the owner', async () => {
		await expect(
			deleteClass.execute({
				user_id: 'anotherUserId',
				class_id: createdClass.id,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
