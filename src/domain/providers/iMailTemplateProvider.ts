export interface MailTemplateDTO {
	file: string;
	variables: {
		[key: string]: string;
	};
}

export default interface iMailTemplateProvider {
	generateTemplate(data: MailTemplateDTO): Promise<string>;
}
