import { MailTemplateDTO } from './iMailTemplateProvider';

interface MailUser {
	name: string;
	email: string;
}

export interface sendMailDTO {
	to: MailUser;
	from?: MailUser;
	subject: string;
	template: MailTemplateDTO;
}

export default interface iMailProvider {
	sendMail(data: sendMailDTO): Promise<void>;
}
