import Class from '../../models/Class';
import iClassesRepository from '../../repositories/iClassesRepository';

interface Request {
	week_day?: number;
	subject?: string;
	time?: number;
	skip?: number;
	limit?: number;
}

interface Response {
	totalClassesFound: number;
	totalClassesInPage: number;
	from: number;
	to: number;
	classes: Class[];
}

class ListClassesService {
	constructor(private classesRepository: iClassesRepository) {}

	public async execute({
		week_day,
		subject,
		time,
		skip,
		limit,
	}: Request): Promise<Response> {
		const params = {};

		week_day &&
			Object.assign(params, {
				week_day,
			});

		subject &&
			Object.assign(params, {
				subject,
			});

		time &&
			Object.assign(params, {
				time,
			});

		skip &&
			Object.assign(params, {
				skip,
			});

		limit &&
			Object.assign(params, {
				limit,
			});

		const { total, classes } = await this.classesRepository.findAll(params);

		skip = skip ? skip : 0;
		limit = limit ? limit : 10;

		const totalClassesInPage = classes.length;
		const totalClassesFound = total;

		let from: number;

		if (totalClassesInPage > 0) {
			from = skip + 1;
		} else {
			from = 0;
		}

		let to: number;

		if (limit > totalClassesInPage) {
			to = skip + totalClassesInPage;
		} else {
			to = skip + limit;
		}

		return {
			totalClassesFound,
			totalClassesInPage,
			from,
			to,
			classes,
		};
	}
}

export default ListClassesService;
