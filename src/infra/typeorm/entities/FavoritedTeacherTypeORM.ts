import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,, ManyToMany
} from 'typeorm';

import FavoritedTeacher from '../../../domain/models/FavoritedTeacher';
import UserTypeORM from './UserTypeORM';

@Entity('favorited_teachers')
class FavoritedTeacherTypeORM implements FavoritedTeacher {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@ManyToOne(() => UserTypeORM, user => user.favoritedUser, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: UserTypeORM;

	@Column()
	teacher_id: string;

	@ManyToMany(() => UserTypeORM, user => user.favoritedTeachers, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
	teacher: UserTypeORM;
}

export default FavoritedTeacherTypeORM;
