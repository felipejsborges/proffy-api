import faker from 'faker';

import CreateConnectionService from '../../../domain/services/Connections/CreateConnectionService';
import FakeConnectionsRepository from '../../../domain/repositories/fakes/FakeConnectionsRepository';
import Connection from '../../../domain/models/Connection';

describe('Connection', () => {
	let fakeConnectionsRepository: FakeConnectionsRepository;
	let createConnection: CreateConnectionService;

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
});
