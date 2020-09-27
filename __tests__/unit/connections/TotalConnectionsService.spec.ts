import faker from 'faker';

import TotalConnectionsService from '../../../src/domain/services/Connections/TotalConnectionsService';
import FakeConnectionsRepository from '../../../src/domain/repositories/fakes/FakeConnectionsRepository';

describe('Connection', () => {
	let fakeConnectionsRepository: FakeConnectionsRepository;
	let totalConnections: TotalConnectionsService;

	beforeEach(() => {
		fakeConnectionsRepository = new FakeConnectionsRepository();
		totalConnections = new TotalConnectionsService(fakeConnectionsRepository);
	});

	it('should be able to show total connections', async () => {
		const user_id = faker.random.uuid();
		const teacher_id = faker.random.uuid();

		const repeat = Math.floor(Math.random() * 6); // 0 ~ 5

		for (let i = 0; i < repeat; i++) {
			await fakeConnectionsRepository.create({ user_id, teacher_id });
		}

		const total = await totalConnections.execute();

		expect(total).toBe(repeat);
	});
});
