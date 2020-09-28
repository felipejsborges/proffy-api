import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import UserTypeORM from './UserTypeORM';

import ClassScheduleTypeORM from './ClassScheduleTypeORM';
import Class from '../../../domain/models/Class';

@Entity('classes')
class ClassTypeORM implements Class {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	subject: string;

	@Column({ type: 'decimal', precision: 5, scale: 2 })
	cost: number;

	@Column()
	user_id: string;

	@ManyToOne(() => UserTypeORM, user => user.class, {
		eager: true,
	})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserTypeORM;

	@OneToMany(
		() => ClassScheduleTypeORM,
		classes_schedules => classes_schedules.class,
		{
			eager: true,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
	)
	classes_schedules?: ClassScheduleTypeORM[];
}

export default ClassTypeORM;
