import request from 'supertest';
import path from 'path';
import fs from 'fs';
import faker from 'faker';
import { Connection, createConnection, getConnection } from 'typeorm';

import app from '../../src/infra/http/app';
import Class from '../../src/domain/models/Class';

import uploadsConfig from '../../src/shared/config/upload';
import User from '../../src/domain/models/User';

describe('AppIntegrationTests', () => {
	let connection: Connection;

	let name: string;
	let email: string;
	let password: string;

	let user: User;
	let user2: User;

	let token: string;

	beforeAll(async () => {
		connection = await createConnection();

		await connection.query('DROP TABLE IF EXISTS favorited_teachers');
		await connection.query('DROP TABLE IF EXISTS classes_schedules');
		await connection.query('DROP TABLE IF EXISTS classes');
		await connection.query('DROP TABLE IF EXISTS connections');
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('DROP TABLE IF EXISTS migrations');

		await connection.runMigrations();
	});

	beforeEach(async () => {
		await connection.query('DELETE FROM favorited_teachers');
		await connection.query('DELETE FROM classes_schedules');
		await connection.query('DELETE FROM classes');
		await connection.query('DELETE FROM connections');
		await connection.query('DELETE FROM users');

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();

		const createUserResponse = await request(app)
			.post('/users')
			.send({ name, email, password });

		user = createUserResponse.body;

		const loginResponse = await request(app)
			.post('/sessions')
			.send({ email, password });

		token = loginResponse.body.token;

		const user2Name = faker.name.findName();
		const user2Email = faker.internet.email();
		const user2Password = faker.internet.password();

		const createUser2Response = await request(app).post('/users').send({
			name: user2Name,
			email: user2Email,
			password: user2Password,
		});

		user2 = createUser2Response.body;
	});

	afterAll(async () => {
		const { tempFolder, uploadsFolder } = uploadsConfig;

		const uploadsFolderFiles = await fs.promises.readdir(uploadsFolder);

		for (const file of uploadsFolderFiles) {
			await fs.promises.unlink(path.join(uploadsFolder, file));
		}

		const tempFolderFiles = await fs.promises.readdir(tempFolder);

		for (const file of tempFolderFiles) {
			await fs.promises.unlink(path.join(tempFolder, file));
		}

		await connection.close();
		await getConnection().close();
	});

	describe('User', () => {
		it('should be able to show user information', async () => {
			const response = await request(app)
				.get(`/users/${user.id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body.id).toBe(user.id);
			expect(response.body.name).toBe(user.name);
			expect(response.body.email).toBe(user.email);
		});

		it('should be able to update user information', async () => {
			const updatedName = faker.name.findName();
			const updatedEmail = faker.internet.email();
			const updatedWhatsapp = faker.phone.phoneNumberFormat(0);
			const updatedBio = faker.lorem.paragraph();

			const response = await request(app)
				.put('/users')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: updatedName,
					email: updatedEmail,
					whatsapp: updatedWhatsapp,
					bio: updatedBio,
				});

			expect(response.status).toBe(200);
			expect(response.body.id).toBe(user.id);
			expect(response.body.name).toBe(updatedName);
			expect(response.body.email).toBe(updatedEmail);
			expect(response.body.whatsapp).toBe(updatedWhatsapp);
			expect(response.body.bio).toBe(updatedBio);
		});

		it('should be able to update avatar', async () => {
			const filePath = path.resolve(__dirname, '..', 'utils', 'profile.jpeg');

			const response = await request(app)
				.patch('/users/avatar')
				.set('Authorization', `Bearer ${token}`)
				.attach('avatar', filePath);

			expect(response.status).toBe(200);
		});

		it('should be send e-mail to recover password', async () => {
			const response = await request(app)
				.post('/password/recover')
				.send({ email });

			expect(response.status).toBe(204);
		});

		it('should be send reset password', async () => {
			const response = await request(app)
				.post(`/password/reset?token=${token}`)
				.send({ password: 'resetPassword' });

			expect(response.status).toBe(204);

			const loginTest = await request(app)
				.post('/sessions')
				.send({ email, password: 'resetPassword' });

			expect(loginTest.status).toBe(201);
		});
	});

	describe('Classes', () => {
		let classItem: Class;

		beforeEach(async () => {
			const createClassOneResponse = await request(app)
				.post('/classes')
				.set('Authorization', `Bearer ${token}`)
				.send({
					subject: 'randomSubject1',
					cost: 100,
				});

			classItem = createClassOneResponse.body;

			await request(app)
				.post(`/classes/${classItem.id}/class_schedules`)
				.set('Authorization', `Bearer ${token}`)
				.send({
					classSchedules: [
						{ week_day: 1, from: '08:00', to: '16:00' },
						{ week_day: 3, from: '08:00', to: '16:00' },
						{ week_day: 5, from: '08:00', to: '16:00' },
					],
				});
		});

		describe('ListClasses', () => {
			let class2: Class;
			let class3: Class;

			beforeEach(async () => {
				const createClassTwoResponse = await request(app)
					.post('/classes')
					.set('Authorization', `Bearer ${token}`)
					.send({
						subject: 'randomSubject2',
						cost: 50,
					});

				class2 = createClassTwoResponse.body;

				await request(app)
					.post(`/classes/${class2.id}/class_schedules`)
					.set('Authorization', `Bearer ${token}`)
					.send({
						classSchedules: [
							{ week_day: 2, from: '10:00', to: '18:00' },
							{ week_day: 4, from: '10:00', to: '18:00' },
							{ week_day: 6, from: '10:00', to: '18:00' },
						],
					});

				const createClassThreeResponse = await request(app)
					.post('/classes')
					.set('Authorization', `Bearer ${token}`)
					.send({
						subject: 'randomSubject1',
						cost: 100,
					});

				class3 = createClassThreeResponse.body;

				await request(app)
					.post(`/classes/${class3.id}/class_schedules`)
					.set('Authorization', `Bearer ${token}`)
					.send({
						classSchedules: [
							{ week_day: 2, from: '10:00', to: '18:00' },
							{ week_day: 4, from: '10:00', to: '18:00' },
							{ week_day: 6, from: '10:00', to: '18:00' },
						],
					});
			});

			it('should be able to list all classes, without apply filters', async () => {
				const response = await request(app)
					.get('/classes')
					.set('Authorization', `Bearer ${token}`);

				expect(response.status).toBe(200);
				expect(response.body.classes[0].id).toBe(classItem.id);
				expect(response.body.classes[1].id).toBe(class2.id);
			});

			it('should be able to list classes applying filters', async () => {
				const response = await request(app)
					.get('/classes')
					.set('Authorization', `Bearer ${token}`)
					.query({
						page: 1,
						limit: 1,
						time: '15:00',
						subject: 'randomSubject1',
						week_day: 1,
					});

				expect(response.status).toBe(200);
				expect(response.body.classes[0].id).toBe(classItem.id);
				expect(response.body.classes[1]).toBeFalsy();
			});

			it('should be able to show multiple pages', async () => {
				const response = await request(app)
					.get('/classes')
					.set('Authorization', `Bearer ${token}`)
					.query({
						page: 2,
						limit: 1,
						subject: 'randomSubject1',
					});

				expect(response.status).toBe(200);
				expect(response.body.totalClassesInPage).toBeGreaterThan(0);
			});

			it('should be able to not show classes when filters can not find any class', async () => {
				const response = await request(app)
					.get('/classes')
					.set('Authorization', `Bearer ${token}`)
					.query({
						subject: 'non-existingSubject',
					});

				expect(response.status).toBe(200);
				expect(response.body.from).toBe(0);
				expect(response.body.to).toBe(0);
				expect(response.body.classes[0]).toBeFalsy();
			});
		});

		describe('TeacherClasses', () => {
			it('should be able to show all classes of a teacher', async () => {
				const response = await request(app)
					.get('/teacher-classes')
					.set('Authorization', `Bearer ${token}`);

				expect(response.status).toBe(200);
				expect(response.body[0].id).toBe(classItem.id);
			});
		});

		describe('UpdateClass', () => {
			it('should be able to update a class', async () => {
				const response = await request(app)
					.put(`/classes/${classItem.id}`)
					.set('Authorization', `Bearer ${token}`)
					.send({
						subject: 'updatedSubject',
						cost: 500,
					});

				expect(response.status).toBe(200);
				expect(response.body.id).toBe(classItem.id);
				expect(response.body.subject).toBe('updatedSubject');
				expect(response.body.cost).toBe(500);
			});
		});

		describe('DeleteClass', () => {
			it('should be able to delete a class', async () => {
				const response = await request(app)
					.delete(`/classes/${classItem.id}`)
					.set('Authorization', `Bearer ${token}`);

				expect(response.status).toBe(204);
			});
		});
	});

	describe('Connections', () => {
		beforeEach(async () => {
			await request(app)
				.post('/connections')
				.set('Authorization', `Bearer ${token}`)
				.send({ teacher_id: user2.id });
		});

		it('should be able to show total connections', async () => {
			const response = await request(app)
				.get('/connections')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBe(1);
		});
	});

	describe('Favorites', () => {
		beforeEach(async () => {
			await request(app)
				.post(`/favorite-teachers/${user2.id}`)
				.set('Authorization', `Bearer ${token}`);
		});

		it('should be able to list all favorited teachers of a user', async () => {
			const response = await request(app)
				.get(`/favorite-teachers`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body[0].teacher_id).toBe(user2.id);
		});

		it('should be able remove a teacher from favorites', async () => {
			const response = await request(app)
				.delete(`/favorite-teachers/${user2.id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(204);
		});
	});
});
