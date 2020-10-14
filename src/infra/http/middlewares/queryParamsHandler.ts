import { Request, Response, NextFunction } from 'express';
import convertHourToMinutes from '../../../shared/utils/convertHourToMinute';

export default function queryParamsHandler(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const page = request.query.page ? Number(request.query.page) : 1;

	const limit = request.query.limit ? Number(request.query.limit) : 999;

	const week_day = request.query.week_day
		? Number(request.query.week_day)
		: undefined;

	const subject = request.query.subject
		? String(request.query.subject)
		: undefined;

	const time = request.query.time
		? convertHourToMinutes(String(request.query.time))
		: undefined;

	let skip = 0;

	if (page) {
		skip = (page - 1) * limit;
	}

	request.listClassesParams = {
		filters: {
			subject,
			week_day,
			time,
		},
		pagination: {
			page: page || 1,
			skip,
			limit,
		},
	};

	return next();
}
