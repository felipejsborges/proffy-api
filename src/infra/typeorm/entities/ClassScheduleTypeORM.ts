import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import ClassTypeORM from './ClassTypeORM';
import ClassSchedule from '../../../domain/models/ClassSchedule';

@Entity('classes_schedules')
class ClassScheduleTypeORM implements ClassSchedule {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	week_day: number;

	@Column()
	from: number;

	@Column()
	to: number;

	@Column()
	class_id: string;

	@ManyToOne(() => ClassTypeORM, classItem => classItem.classes_schedules, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
	class: ClassTypeORM;
}

export default ClassScheduleTypeORM;
