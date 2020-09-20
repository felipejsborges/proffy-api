import path from 'path';

import AppError from '../../../shared/errors/AppError';
import iJWTProvider from '../../providers/iJWTProvider';
import iMailProvider from '../../providers/iMailProvider';
import iUsersRepository from '../../repositories/iUsersRepository';

interface Request {
	email: string;
}

class SendEmailToRecoverPasswordService {
	constructor(
		private usersRepository: iUsersRepository,
		private mailProvider: iMailProvider,
		private jwtProvider: iJWTProvider,
	) {}

	public async execute({ email }: Request): Promise<void> {
		const user = await this.usersRepository.findOneByEmail({ email });

		if (!user) {
			throw new AppError('User does not exist', 401);
		}

		const { token } = this.jwtProvider.generate({ user_id: user.id });

		const resetPasswordMailTemplate = path.resolve(
			__dirname,
			'..',
			'..',
			'views',
			'recoverPasswordTemplate.hbs',
		);

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email,
			},
			subject: 'Password Recover',
			template: {
				file: resetPasswordMailTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
				},
			},
		});
	}
}

export default SendEmailToRecoverPasswordService;
