import ClassSchedule from './ClassSchedule';

export default interface Class {
	class: {
		id: number;
		subject: string;
		cost: number;
		user_id: number;
	};
	schedule: ClassSchedule[];
}
