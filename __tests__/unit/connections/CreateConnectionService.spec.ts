import faker from 'faker';

import CreateConnectionService from '../../../src/domain/services/Connections/CreateConnectionService';
import FakeConnectionsRepository from '../../../src/domain/repositories/fakes/FakeConnectionsRepository';
import Connection from '../../../src/domain/models/Connection';

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
