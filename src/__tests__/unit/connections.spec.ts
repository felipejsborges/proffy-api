import faker from 'faker';

import CreateConnectionService from '../../domain/services/Connections/CreateConnectionService';
import TotalConnectionsService from '../../domain/services/Connections/TotalConnectionsService';

import FakeConnectionsRepository from '../../domain/repositories/fakes/FakeConnectionsRepository';

import Connection from '../../domain/models/Connection';

describe('Connection', () => {
	let fakeConnectionsRepository: FakeConnectionsRepository;
	let createConnection: CreateConnectionService;
	let totalConnections: TotalConnectionsService;

	beforeEach(() => {
		fakeConnectionsRepository = new FakeConnectionsRepository();
		createConnection = new CreateConnectionService(fakeConnectionsRepository);
	});

	it('should be able to create a connection', async () => {
		const user_id = faker.random.uuid();
		const connection = await createConnection.execute({ user_id });

		expect(connection).toBeInstanceOf(Connection);
		expect(connection).toHaveProperty('id');
	});

	it('should be able to show total connections', async () => {
		totalConnections = new TotalConnectionsService(fakeConnectionsRepository);

		const user_id = faker.random.uuid();

		const repeat = Math.floor(Math.random() * 6); // 0 ~ 5

		for (let i = 0; i < repeat; i++) {
			await createConnection.execute({ user_id });
		}

		const total = await totalConnections.execute();

		expect(total).toBe(repeat);
	});
});
