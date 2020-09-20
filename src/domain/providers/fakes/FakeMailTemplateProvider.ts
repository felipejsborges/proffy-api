import iMailTemplateProvider, {
	MailTemplateDTO,
} from '../iMailTemplateProvider';

class FakeMailTemplateProvider implements iMailTemplateProvider {
	public async generateTemplate(data: MailTemplateDTO): Promise<string> {
		return 'Mail content';
	}
}

export default FakeMailTemplateProvider;
