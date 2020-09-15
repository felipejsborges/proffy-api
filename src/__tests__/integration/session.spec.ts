import request from 'supertest';
import faker from 'faker';
import { Connection } from 'typeorm';

import app from '../../infra/http/app';
import createConnection from '../../infra/typeorm';

describe('Session', () => {
	let connection: Connection;

	beforeAll(async () => {
		connection = await createConnection('test');

		await connection.runMigrations();
	});

	beforeEach(async () => {
		await connection.query('DELETE FROM users');
		await connection.query('DELETE FROM classes');
		await connection.query('DELETE FROM classes_schedules');
		await connection.query('DELETE FROM connections');
	});

	afterAll(async () => {
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('DROP TABLE IF EXISTS classes');
		await connection.query('DROP TABLE IF EXISTS classes_schedules');
		await connection.query('DROP TABLE IF EXISTS connections');

		await connection.close();
	});

	it('should be able to create a session with valid credentials', async () => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		await request(app).post('/users').send({ name, email, password });

		const response = await request(app)
			.post('/sessions')
			.send({ email, password });

		expect(response.status).toBe(201);
	});
});
