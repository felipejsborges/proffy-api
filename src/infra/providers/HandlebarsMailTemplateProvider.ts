import handlebars from 'handlebars';
import fs from 'fs';

import iMailTemplateProvider, {
	MailTemplateDTO,
} from '../../domain/providers/iMailTemplateProvider';

class HandlebarsMailTemplateProvider implements iMailTemplateProvider {
	public async generateTemplate({
		file,
		variables,
	}: MailTemplateDTO): Promise<string> {
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: 'utf-8',
		});
		const parseTemplate = handlebars.compile(templateFileContent);

		return parseTemplate(variables);
	}
}

export default HandlebarsMailTemplateProvider;
