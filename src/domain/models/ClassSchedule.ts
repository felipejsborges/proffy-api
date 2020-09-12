import { uuid } from 'uuidv4';

class ClassSchedule {
	id: string;
	week_day: number;
	from: number;
	to: number;
	class_id: string;

	constructor({ week_day, from, to, class_id }: Omit<ClassSchedule, 'id'>) {
		this.id = uuid();
		this.week_day = week_day;
		this.from = from;
		this.to = to;
		this.class_id = class_id;
	}
}

export default ClassSchedule;
