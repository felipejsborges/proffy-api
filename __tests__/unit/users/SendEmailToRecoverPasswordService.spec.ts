import faker from 'faker';

import SendEmailToRecoverPasswordService from '../../../src/domain/services/Users/SendEmailToRecoverPasswordService';
import FakeUsersRepository from '../../../src/domain/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '../../../src/domain/providers/fakes/FakeMailProvider';
import FakeJWTProvider from '../../../src/domain/providers/fakes/FakeJWTProvider';
import AppError from '../../../src/shared/errors/AppError';
import User from '../../../src/domain/models/User';

describe('SendEmailToRecoverPassword', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let sendEmailToRecoverPassword: SendEmailToRecoverPasswordService;
	let fakeMailProvider: FakeMailProvider;
	let fakeJWTProvider: FakeJWTProvider;

	let name: string;
	let email: string;
	let password: string;

	let user: User;

	beforeEach(async () => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeJWTProvider = new FakeJWTProvider();

		sendEmailToRecoverPassword = new SendEmailToRecoverPasswordService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeJWTProvider,
		);

		name = faker.name.findName();
		email = faker.internet.email();
		password = faker.internet.password();

		user = await fakeUsersRepository.create({ name, email, password });
	});

	it('should be able to send e-mail to recover password', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await sendEmailToRecoverPassword.execute({ email });

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to send e-mail to a non-existing user', async () => {
		await expect(
			sendEmailToRecoverPassword.execute({
				email: 'non-existing_email@test.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a token to recover password', async () => {
		const generateToken = jest.spyOn(fakeJWTProvider, 'generate');

		await sendEmailToRecoverPassword.execute({
			email,
		});

		expect(generateToken).toHaveBeenCalledWith({ user_id: user.id });
	});
});
