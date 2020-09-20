import iMailProvider, { sendMailDTO } from '../iMailProvider';

class FakeMailProvider implements iMailProvider {
	private messages: sendMailDTO[] = [];

	public async sendMail(message: sendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}

export default FakeMailProvider;
