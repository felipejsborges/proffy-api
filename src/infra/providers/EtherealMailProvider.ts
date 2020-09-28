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
		const testAccount = await nodemailer.createTestAccount();

		const transporter = nodemailer.createTransport({
			host: testAccount.smtp.host,
			port: testAccount.smtp.port,
			secure: testAccount.smtp.secure,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
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

		const info = await transporter.sendMail(message);

		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}
}
