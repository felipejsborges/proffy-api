declare namespace Express {
	export interface Request {
		user: {
			id: string;
		};
		fileName: string;
		listClassesParams: {
			filters: {
				week_day?: number;
				subject?: string;
				time?: number;
			};
			pagination: {
				page: number;
				skip: number;
				limit: number;
			};
		};
	}
}
