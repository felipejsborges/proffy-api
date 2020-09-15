import request from 'supertest';
import faker from 'faker';
import { Connection } from 'typeorm';

import app from '../../src/infra/http/app';
import createConnection from '../../src/infra/typeorm';
import User from '../../src/domain/models/User';

describe('Session', () => {
	let connection: Connection;

	let name: string;
	let email: string;
	let password: string;

	let user: User;

	beforeAll(async () => {
		connection = await createConnection('test');

		await connection.runMigrations();

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();

		const response = await request(app)
			.post('/users')
			.send({ name, email, password });

		user = response.body;
	});

	afterAll(async () => {
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('DROP TABLE IF EXISTS classes');
		await connection.query('DROP TABLE IF EXISTS classes_schedules');
		await connection.query('DROP TABLE IF EXISTS connections');

		await connection.close();
	});

	it('should be able to create a session with valid credentials', async () => {
		const response = await request(app)
			.post('/sessions')
			.send({ email, password });

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('token');
	});

	it('should not be able to create a session with invalid credentials', async () => {
		const response = await request(app)
			.post('/sessions')
			.send({ email, password: 'wrongPassword' });

		expect(response.status).toBe(401);
	});

	it('should be able to access private routes when authenticated', async () => {
		const authentication = await request(app)
			.post('/sessions')
			.send({ email, password });

		const { token } = authentication.body;

		const subject = 'fakeSubject';
		const cost = 50;

		const response = await request(app)
			.post('/classes')
			.set('Authorization', `Bearer ${token}`)
			.send({ user_id: user.id, subject, cost });

		expect(response.status).toBe(201);
	});

	it('should not be able to access private routes without jwt token', async () => {
		const subject = 'fakeSubject';
		const cost = 50;

		const response = await request(app)
			.post('/classes')
			.send({ user_id: user.id, subject, cost });

		expect(response.status).toBe(401);
	});

	it('should not be able to access private routes with invalid jwt token', async () => {
		const subject = 'fakeSubject';
		const cost = 50;

		const response = await request(app)
			.post('/classes')
			.set('Authorization', 'Bearer invalidToken')
			.send({ user_id: user.id, subject, cost });

		expect(response.status).toBe(401);
	});
});
