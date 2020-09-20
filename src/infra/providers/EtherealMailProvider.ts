import nodemailer from 'nodemailer';
import iMailProvider, {
	sendMailDTO,
} from '../../domain/providers/iMailProvider';
import iMailTemplateProvider from '../../domain/providers/iMailTemplateProvider';

export default class EtherealMailProvider implements iMailProvider {
	constructor(private mailTemplateProvider: iMailTemplateProvider) {}

	public async sendMail({
		from,
		to,
		subject,
		template,
	}: sendMailDTO): Promise<void> {
		nodemailer.createTestAccount(async (err, account) => {
			if (err) {
				console.error('Failed to create a testing account. ' + err.message);
				return process.exit(1);
			}

			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});

			const message = {
				from: {
					name: from?.name || 'Equipe Proffy',
					address: from?.email || 'equipe@proffy.com.br',
				},
				to: {
					name: to.name,
					address: to.email,
				},
				subject,
				html: await this.mailTemplateProvider.generateTemplate(template),
			};

			transporter.sendMail(message, (err, info) => {
				if (err) {
					console.log('Error occurred. ' + err.message);
					return process.exit(1);
				}

				console.log('Message sent: %s', info.messageId);
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			});
		});
	}
}
